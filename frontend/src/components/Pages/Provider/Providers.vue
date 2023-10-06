<template>
  <div class="mt-1">
    <div class="row">
      <div class="col-12 col-md-4">
        <LayoutPageTitle />
      </div>
      <div class="col-12 p-0 col-md-8 d-flex justify-content-end">
        <el-space>
          <el-select></el-select>
          <el-button class="bg-primary text-white" @click="AddProviderPage"> Add Provider</el-button>
          <el-button class="bg-primary text-white"> Export Options</el-button>
        </el-space>
      </div>
    </div>
    <el-divider class="mt-2"></el-divider>
    <div class="row justify-content-end">
      <div
          v-if="selectedRows.length > 0"
          class="col-9 px-0 mx-0 d-flex align-items-center justify-content-end"
      >
        <span class="me-2 fs-3">{{ selectedRows.length }}</span>
        <el-button
            type="danger"
            data-bs-toggle="modal"
            data-bs-target="#deleteMultipleModal"
        >Delete Selected
        </el-button>
      </div>
      <div class="col-12 col-md-3">
        <el-input
            v-model="Filter.search"
            @input="getProviders"
            placeholder="Search here..."
            clearable
        ></el-input>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col">
        <el-table
            :data="Providers"
            v-loading="loading"
            :header-cell-style="HeaderStyle"
            :style="{ width: '100%' }"
            stripe
            border
            class="custom-table"
            :row-key="(row) => row.id"
            :selectable="(row) => row.status !== 'disabled'"
            @selection-change="handleSelectionChange"
        >
          <template #append>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="Filter.currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="Filter.pageSize"
                layout=" prev, pager, next,sizes"
                :total="Filter.totalCount"
                class="bg-gray p-2"
                background
            >
            </el-pagination>
          </template>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="Name" width="180"/>
          <el-table-column prop="email" label="Email" width="220"/>
          <el-table-column prop="mobile" label="Mobile"/>
          <el-table-column prop="address1" label="Address"/>
          <el-table-column prop="city" label="City"/>
          <el-table-column label="Actions" align="center" width="100">
            <template #default="scope">
              <el-space spacer="|" alignment="center">
                <router-link
                    to="/provider_details"
                    class="menu-link"
                    @click="SetProviderId(scope.row.id)"
                >
                  <i
                      class="bi bi-pencil-square text-primary action-btn fs-6"
                  ></i>
                </router-link>
                <i
                    data-bs-toggle="modal"
                    data-bs-target="#deleteEntityModal"
                    class="bi bi-trash3 text-danger action-btn fs-6"
                    @click="(name = scope.row.name), SetProviderId(scope.row.id)"
                ></i>
              </el-space>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>

    <DeleteEntity
        @deleteClientSuccess="getProviders"
        :entityId="providerId"
        title="Provider"
        :show="deleteModal"
        :name="name"
        slug="provider"
    />
    <DeleteMultiple
        @deleteClientSuccess="getProviders"
        @on-items-select="onItemSelect"
        :entityId="providerId"
        title="Providers"
        :show="deleteMultipleModal"
        :name="name"
        :no="selectedIds"
        slug="provider"
    />

</template>

<script>
import ApiService from "@/core/services/ApiService";
import {MenuComponent} from "../../../assets/ts/components";
import DeleteEntity from "../../UI/DeleteEntity.vue";
import DeleteMultiple from "../../UI/DeleteMultiple.vue";
import LayoutPageTitle from "../../../layouts/main-layout/toolbar/PageTitle.vue";
import {HeaderStyle} from "../../UI/StyleJs";
export default {
  name: "ProvidersList",
  components: {
    LayoutPageTitle,
    DeleteEntity,
    DeleteMultiple
  },
  data() {
    return {
      HeaderStyle: HeaderStyle,
      loading: false,
      multipleTableRef:[],
      providerId: 0,
      deleteModal: false,
      deleteMultipleModal: true,
      selectedIds: [],
      name: "",
      Providers: [],
      Filter: {
        clientId: 1,
        providerId: 0,
        search: "",
        sort: "",
        pageSize: 10,
        currentPage: 1,
        totalCount: 0,
      },
      selectedRows:[],
    };
  },
  methods: {

    handleSelectionChange(selection) {
      this.selectedRows = selection;
      this.selectedIds = selection;
    },
    AddProviderPage() {
      sessionStorage.removeItem("providerId");
      this.$router.push("/provider_details");
    },
    SetProviderId(id) {
      this.providerId = id;
      sessionStorage.setItem("providerId", id);
    },
    getMenu() {
      MenuComponent.reinitialization();
      MenuComponent.createInsance();
    },
    handleCurrentChange(newPage) {
      if (newPage !== undefined) {
        this.Filter.currentPage = newPage;
      }
      this.getProviders();
    },
    handleSizeChange(newSize) {
      if (newSize !== undefined) {
        this.Filter.pageSize = newSize;
      }
      this.getProviders();
    },
    async getProviders() {
      let response = await ApiService.get(
          "provider",
          "getproviders?clientId=" +
          this.Filter.clientId +
          "&search=" +
          this.Filter.search +
          "&sort=" +
          this.Filter.sort +
          "&limit=" +
          this.Filter.pageSize +
          "&page=" +
          this.Filter.currentPage
      );
      this.Providers = response.data.items ?? [];
    },
    async deleteClient(clientId) {
      await ApiService.delete("provider/?providerId=" + clientId);
      await this.getProviders();
    },
    onItemSelect(selectedItems) {
      this.selectedIds = selectedItems;
    },
  },
  created() {
    this.getProviders();
  },
};
</script>

<style scoped>
.el-dropdown-menu {
  width: 150px !important;
}
</style>
