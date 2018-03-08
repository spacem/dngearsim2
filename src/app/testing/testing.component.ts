import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({ selector: 'app-loading', template: '' })
export class StubLoadingComponent { }

@Component({ selector: 'app-item-link', template: '' })
export class StubItemLinkComponent {
  @Input() item: any;
}

@Component({ selector: 'app-stats', template: '' })
export class StubStatsComponent {
    @Input() stats: any[];
    @Input() altStats: any[];
    @Input() brSeparator: boolean;
}

@Component({ selector: 'app-item-edit', template: '' })
export class StubItemEditComponent {
    @Input() item;
}

@Component({ selector: 'app-item-icon', template: '' })
export class StubItemIconComponent {
    @Input() item: any;
}

@Component({ selector: 'app-build-summary', template: '' })
export class StubBuildSummaryComponent {
    @Input() buildName;
    @Input() build;
}

@Component({ selector: 'app-build', template: '' })
export class StubBuildComponent {
    @Input() buildName;
    @Input() build;
}

@Component({ selector: 'app-region', template: '' })
export class StubRegionComponent {
}

@Component({ selector: 'app-category-links', template: '' })
export class StubCategoryLinksComponent {
    @Input() category: any;
    @Input() collapse: boolean;
}

@Component({ selector: 'app-job-icon', template: '' })
export class StubJobIconComponent {
    @Input() item;
    @Input() small;
}

@Component({ selector: 'app-build-item', template: '' })
export class StubBuildItemComponent {
    @Input() item: any;
}

@Component({ selector: 'app-build-assignment', template: '' })
export class StubBuildAssignmentComponent {
}

@Component({ selector: 'app-skill-search', template: '' })
export class StubSkillSearchComponent {
}

@Component({ selector: 'app-custom-items', template: '' })
export class StubCustomItemsComponent {
}

@Component({ selector: 'app-everything-search', template: '' })
export class StubEverythingSearchComponent {
}

@Component({ selector: 'app-item-edit-potential', template: '' })
export class StubItemEditPotentialComponent {
}

@Component({ selector: 'app-item-view-craft', template: '' })
export class StubItemViewCraftComponent {
}

@Component({ selector: 'app-item-view-set', template: '' })
export class StubItemViewSetComponent {
}

@Component({ selector: 'app-item-view-attainment', template: '' })
export class StubItemViewAttainmentComponent {
}

@Component({ selector: 'app-item-view-tuning', template: '' })
export class StubItemViewTuningComponent {
}

@Component({ selector: 'app-item-view-transfer', template: '' })
export class StubItemViewTransferComponent {
}

@Component({ selector: 'app-item-view-box', template: '' })
export class StubItemViewBoxComponent {
}

@Component({ selector: 'app-item-view-extraction', template: '' })
export class StubItemViewExtractionComponent {
}

@Component({ selector: 'app-item-view-shop', template: '' })
export class StubItemViewShopComponent {
}

@Component({ selector: 'app-item-view-plate', template: '' })
export class StubItemViewPlateComponent {
}
