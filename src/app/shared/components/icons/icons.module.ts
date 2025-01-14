import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconBaseComponent } from './icon-base/icon-base.component';
import { IconAltCodeComponent } from './icon-alt-code/icon-alt-code.component';
import { IconArrowRightComponent } from './icon-arrow-right/icon-arrow-right.component';
import { IconBreadcrumbSeparatorComponent } from './icon-breadcrumb-separator/icon-breadcrumb-separator.component';
import { IconCloseComponent } from './icon-close/icon-close.component';
import { IconCloseNewComponent } from './icon-close-new/icon-close-new.component';
import { IconCopyComponent } from './icon-copy/icon-copy.component';
import { IconCorrectComponent } from './icon-correct/icon-correct.component';
import { IconHomeComponent } from './icon-home/icon-home.component';
import { IconLoadingComponent } from './icon-loading/icon-loading.component';
import { IconLogoutComponent } from './icon-logout/icon-logout.component';
import { IconMenuComponent } from './icon-menu/icon-menu.component';
import { IconMpnrComponent } from './icon-mpnr/icon-mpnr.component';
import { IconOpenComponent } from './icon-open/icon-open.component';
import { IconProductComponent } from './icon-product/icon-product.component';
import { IconScanComponent } from './icon-scan/icon-scan.component';
import { IconSearchComponent } from './icon-search/icon-search.component';
import { IconSelectArrowComponent } from './icon-select-arrow/icon-select-arrow.component';
import { IconTipComponent } from './icon-tip/icon-tip.component';
import { IconUpcComponent } from './icon-upc/icon-upc.component';
import { IconWrongComponent } from './icon-wrong/icon-wrong.component';

const ICON_MODULES = [
  IconBaseComponent,
  IconAltCodeComponent,
  IconArrowRightComponent,
  IconBreadcrumbSeparatorComponent,
  IconCloseComponent,
  IconCloseNewComponent,
  IconCopyComponent,
  IconCorrectComponent,
  IconHomeComponent,
  IconLoadingComponent,
  IconLogoutComponent,
  IconMenuComponent,
  IconMpnrComponent,
  IconOpenComponent,
  IconProductComponent,
  IconScanComponent,
  IconSearchComponent,
  IconSelectArrowComponent,
  IconTipComponent,
  IconUpcComponent,
  IconWrongComponent,
];

@NgModule({
  declarations: ICON_MODULES,
  imports: [CommonModule],
  exports: ICON_MODULES,
})
export class IconsModule {}
