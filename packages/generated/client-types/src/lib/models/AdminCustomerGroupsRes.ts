/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRelation, Merge } from "../core/ModelUtils"

import type { CustomerGroup } from "./CustomerGroup"

export interface AdminCustomerGroupsRes {
  /**
   * Customer group details.
   */
  customer_group: CustomerGroup
}
