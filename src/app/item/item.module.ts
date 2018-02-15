import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemEditCustomComponent } from './item-edit-custom/item-edit-custom.component';
import { ItemEditEnchantmentComponent } from './item-edit-enchantment/item-edit-enchantment.component';
import { ItemEditPotentialComponent } from './item-edit-potential/item-edit-potential.component';
import { ItemEditSkillComponent } from './item-edit-skill/item-edit-skill.component';
import { ItemEditSparkComponent } from './item-edit-spark/item-edit-spark.component';
import { ItemEditTalismanComponent } from './item-edit-talisman/item-edit-talisman.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemViewAttainmentComponent } from './item-view-attainment/item-view-attainment.component';
import { ItemViewBoxComponent } from './item-view-box/item-view-box.component';
import { ItemViewCraftComponent } from './item-view-craft/item-view-craft.component';
import { ItemViewExtractionComponent } from './item-view-extraction/item-view-extraction.component';
import { ItemViewPlateComponent } from './item-view-plate/item-view-plate.component';
import { ItemViewSetComponent } from './item-view-set/item-view-set.component';
import { ItemViewShopComponent } from './item-view-shop/item-view-shop.component';
import { ItemViewTransferComponent } from './item-view-transfer/item-view-transfer.component';
import { ItemViewTuningComponent } from './item-view-tuning/item-view-tuning.component';
import { ItemComponent } from './item/item.component';
import { ItemRoutingModule } from './item-routing.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    ItemRoutingModule,
    CoreModule
  ],
  declarations: [
    ItemEditCustomComponent,
    ItemEditEnchantmentComponent,
    ItemEditPotentialComponent,
    ItemEditSkillComponent,
    ItemEditSparkComponent,
    ItemEditTalismanComponent,
    ItemEditComponent,
    ItemViewAttainmentComponent,
    ItemViewBoxComponent,
    ItemViewCraftComponent,
    ItemViewExtractionComponent,
    ItemViewPlateComponent,
    ItemViewSetComponent,
    ItemViewShopComponent,
    ItemViewTransferComponent,
    ItemViewTuningComponent,
    ItemComponent
  ]
})
export class ItemModule { }
