import { Injectable } from '@angular/core';
import { QuickAddStepsService } from './quick-add-steps.service';
import { QuickAddHelperService } from './quick-add-helper.service';

@Injectable()
export class QuickAddService {

  constructor(
    private quickAddStepsService: QuickAddStepsService,
    private quickAddHelperService: QuickAddHelperService) { }


  categorySteps = {
    titles: ['titleStep'],
    weapons: ['exchangeStep', 'levelStep', 'rankStep', 'itemNameStep', 'hasStatStep', 'itemStep', 'enhanceEqStep'],
    armour: ['exchangeStep', 'levelStep', 'rankStep', 'itemNameStep', 'hasStatStep', 'itemStep', 'enhanceEqStep'],
    accessories: ['accExchangeStep', 'levelStep', 'rankStep', 'itemNameStep', 'hasStatStep', 'itemStep'],
    techs: ['exchangeStep', 'levelStep', 'rankStep', 'techSkillStep', 'itemNameStep', 'hasStatStep', 'itemStep'],
    'offensive gems': ['levelStep', 'gemRankStep', 'itemNameStep', 'numStatsStep', 'hasStatStep', 'itemStep', 'enhanceGemStep'],
    'increasing gems': ['levelStep', 'gemRankStep', 'itemNameStep', 'numStatsStep', 'hasStatStep', 'itemStep', 'enhanceGemStep'],
    'enhancement plates': ['levelStep', 'rankStep', 'distinctItemNameStep', 'numStatsStep', 'hasStatStep', 'itemStep'],
    'expedition plates': ['levelStep', 'distinctItemNameStep', 'numStatsStep', 'highStatStep', 'hasStatStep', 'itemStep'],
    talisman: ['levelStep', 'talismanRankStep', 'distinctItemNameStep', 'numStatsStep', 'hasStatStep', 'itemStep', 'enhanceTalismanStep'],
    costume: ['exchangeStep', 'rankStep', 'itemNameStep', 'itemStep'],
    imprint: ['rankStep', 'itemNameStep', 'highStatStep', 'itemStep'],
    cash: ['accExchangeStep', 'rankStep', 'itemNameStep', 'itemStep'],
    custom: ['customStep'],
  };

  getOptions(category: any, build: any, datas: any) {
    var t = this;
    if (category.name in this.categorySteps) {
      var stepName = this.getStepName(category, datas.length);
      var stepDef = this.quickAddStepsService.steps[stepName];
      var allOptions = stepDef.getOptions(category, build, datas);
      if (stepDef.isItemStep) {
        return allOptions;
      }
      else {
        if (stepDef.minOptions) {
          var unfilteredItems = this.quickAddHelperService.findData(category, build, datas, 50);
        }

        var newOptions = allOptions.filter(option => {
          var tempDatas = datas.concat([
            t.createData(option, category, datas.length)
          ]);

          var items;
          if (stepDef.minOptions) {
            if (allOptions[0] == option) {
              return true;
            }

            items = this.quickAddHelperService.findData(category, build, tempDatas, 50);
            if (items.length > 0 && items.length < 50) {
              return items.length < unfilteredItems.length;
            }
          }
          else {
            items = this.quickAddHelperService.findData(category, build, tempDatas, 1);
          }
          return items.length;
        });

        if (stepDef.minOptions && newOptions.length < stepDef.minOptions) {
          return [allOptions[0]];
        }

        return newOptions;
      }
    }
    else {
      return [];
    }
  }

  hasOptions(category: any, build: any, datas: any) {
    if (category.name in this.categorySteps) {
      var stepName = this.getStepName(category, datas.length);
      if (this.quickAddStepsService.steps[stepName].hasOptions) {
        return this.quickAddStepsService.steps[stepName].hasOptions(category, build, datas);
      }
      else {
        return this.quickAddStepsService.steps[stepName].getOptions(category, build, datas).length > 0;
      }
    }
    else {
      return false;
    }
  }

  isValidStepNumber(category: any, stepNumber: any) {
    return this.categorySteps[category.name].length > stepNumber;
  }

  createData(value: any, category: any, stepNumber: any) {
    var stepName = this.getStepName(category, stepNumber);
    var def = this.quickAddStepsService.steps[stepName];

    return {
      step: stepName,
      value: value,
      def: def,
    };
  }

  getItem(datas: any) {
    return this.quickAddHelperService.getItem(datas);
  }

  getStepName(category, stepNumber) {
    return this.categorySteps[category.name][stepNumber];
  }
}
