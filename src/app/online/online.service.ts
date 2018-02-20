import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as LZString from 'lz-string';
import * as _ from 'lodash';

@Injectable()
export class OnlineService {

  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC-Mckgho1xAI2SQzsKnpsr2ObDKOhdSrE',
      authDomain: 'dngearsim.firebaseapp.com',
      databaseURL: 'https://dngearsim.firebaseio.com',
      storageBucket: 'dngearsim.appspot.com',
    });
  }

  getUser() {
    return firebase.auth().currentUser;
  }

  login() {
    return new Promise((resolve, reject) => {
      var auth = firebase.auth();
        
      auth.onAuthStateChanged(user => {
        if(user == null) {
          // console.log('redirecting');
          window.location.href = 'login.html';
        }
        else {
          // console.log('logged in');
          resolve(user);
        }
      });
    });
  }
  
  getProfile(uid) {
    // console.log('get profile');
    return new Promise((resolve, reject) => {
      firebase.database().ref('profile/' + uid).once('value', function(storedProfile) {
        if(storedProfile) {
          resolve(storedProfile.val());
        }
        else {
          resolve({});
        }
      });
    });
  }
  
  getBuild(uid, buildName) {
    // console.log('get build');
    return new Promise((resolve, reject) => {
      firebase.database().ref('builds/' + uid + '/' + this.stripBuildName(buildName)).once('value', function(storedProfile) {
        if(storedProfile) {
          resolve(this.decompressBuild(storedProfile.val()));
        }
        else {
          resolve({});
        }
      });
    });
  }
  
  saveProfile(profile) {
    return new Promise((resolve, reject) => {
      var user = this.getUser();
      if(user) {
        profile = _.clone(profile);
        this.deleteNullProperties(profile, true);
        firebase.database().ref('profile/' + user.uid).set(profile).then(resolve);
      }
    });
  }
  
  getUserBuilds(uid) {
    // console.log('get builds');
    return new Promise((resolve, reject) => {
      // console.log('getting builds');
      firebase.database().ref('builds/' + uid).once('value', function(storedBuilds) {
        if(storedBuilds) {
          var retVal = {};
          var val = storedBuilds.val();
          for(var buildName in val) {
            retVal[buildName] = this.decompressBuild(val[buildName]);
          }
          resolve(retVal);
        }
        else {
          resolve({});
        }
      });
    });
  }
  
  getClassBuilds(job) {
    // console.log('get class builds');
    return new Promise((resolve, reject) => {
      // console.log('getting builds', job.id);
      firebase.database().ref('job-builds/' + job.id).once('value', function(jobBuilds) {
        // console.log('ok');
        if(jobBuilds) {
          resolve(jobBuilds.val());
        }
        else {
          resolve({});
        }
      });
    });
  }
  
  compressBuild(build) {
    
    if(build.items) {
      _.each(build.items, function(item) {
        delete item.fullStats;
      });
    }
    
    var stringifiedData = JSON.stringify(build);
    return LZString.compressToUTF16(stringifiedData);
  }
  
  decompressBuild(compressedBuild) {
    var stringifiedData = LZString.decompressFromUTF16(compressedBuild);
    var build = JSON.parse(stringifiedData);
    
    if(build.items) {
      _.each(build.items, function(item) {
        item.fullStats = item.stats;
        
        if(item.enchantmentStats && item.enchantmentStats.length) {
          item.fullStats = this.valuesService.mergeStats(item.enchantmentStats, item.fullStats);
        }
        
        if(item.sparkStats && item.sparkStats.length) {
          item.fullStats = this.valuesService.mergeStats(item.sparkStats, item.fullStats);
        }
      });
    }
    
    return build;
  }
  
  saveBuild(buildName, build) {
    var user = this.getUser();
    var actions = [];
    if(user) {
      build = _.clone(build);
      this.deleteNullProperties(build, true);
      // console.log('saving', build);
      actions.push(
        firebase.database().ref('builds/' + user.uid + '/' + this.stripBuildName(buildName)).set(this.compressBuild(build))
      );
      
      if(build.job && build.job.id) {
        // console.log('saving build');
          
        var data: any = {};
        if(build.playerLevel) {
          data.lev = build.playerLevel;
        }
        if(build.region) {
          data.region = build.region;
        }
        if(build.guild) {
          data.guild = build.guild;
        }
        if(build.about) {
          data.about = build.about;
        }
        
        this.deleteNullProperties(data, true);
          
        actions.push(
          firebase.database().ref('job-builds/' + build.job.id + '/' + user.uid + '/' + this.stripBuildName(buildName)).set(data)
        );
      }
    }
    return Promise.all(actions);
  }
  
  deleteNullProperties(test, recurse) {
    for (var i in test) {
        if (test[i] === undefined) {
            delete test[i];
        } else if (recurse && typeof test[i] === 'object') {
          this.deleteNullProperties(test[i], recurse);
        }
    }
  }
  
  signOut() {
    var auth = firebase.auth();
    return new Promise((resolve, reject) => {
      auth.signOut().then(function() {
        resolve();
      }, function(error) {
        reject();
      });
    });
  }
  
  deleteAccount(builds) {
    var auth = firebase.auth();
    var user = this.getUser();
    
    return new Promise((resolve, reject) => {
      
      var pList = [
        firebase.database().ref('builds/' + user.uid).remove(),
        firebase.database().ref('profile/' + user.uid).remove(),
        firebase.database().ref('private/' + user.uid).remove()];
        
      var jobIds = [];
      for(var buildName in builds) {
        if(builds[buildName].job) {
          jobIds.push(builds[buildName].job.id);
        }
      }
      
      jobIds = _.uniq(jobIds);
      _.each(jobIds, function(id) {
        pList.push(
          firebase.database().ref('job-builds/' + id + '/' + user.uid).remove()
        )
      });
        
      Promise.all(pList).then(() => {
        // console.log('deleted data');
        user.delete().then(function() {
          // console.log('deleted user');
          auth.signOut().then(function() {
            // console.log('signed out');
            resolve();
          }, function(error) {
            reject();
          });
        });
      });
    });
  }
  
  deleteBuild(buildName, build) {
    
    var pList = [];
    var user = this.getUser();
    if(user) {
      pList.push(
        firebase.database().ref('builds/' + user.uid + '/' + this.stripBuildName(buildName)).remove());
      
      if(build.job) {
        pList.push(
          firebase.database().ref('job-builds/' + build.job.id + '/' + user.uid + '/' + this.stripBuildName(buildName)).remove());
      }
    }
    
    return Promise.all(pList);
  }
  
  stripBuildName(buildName) {
    return buildName.replace(/[.$\[\]#\/]/g, '');
  }

}
