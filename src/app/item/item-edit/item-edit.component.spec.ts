import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditComponent } from './item-edit.component';
import { TestingModule } from '../../testing/testing.module';
import { ItemEditEnchantmentComponent } from '../item-edit-enchantment/item-edit-enchantment.component';
import { ItemEditTalismanComponent } from '../item-edit-talisman/item-edit-talisman.component';
import { ItemEditCustomComponent } from '../item-edit-custom/item-edit-custom.component';
import { ItemEditSkillComponent } from '../item-edit-skill/item-edit-skill.component';
import { ItemEditSparkComponent } from '../item-edit-spark/item-edit-spark.component';

describe('ItemEditComponent', () => {
  let component: ItemEditComponent;
  let fixture: ComponentFixture<ItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      declarations: [
        ItemEditComponent,
        ItemEditEnchantmentComponent,
        ItemEditTalismanComponent,
        ItemEditCustomComponent,
        ItemEditSkillComponent,
        ItemEditSparkComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditComponent);
    component = fixture.componentInstance;
    component.item = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
