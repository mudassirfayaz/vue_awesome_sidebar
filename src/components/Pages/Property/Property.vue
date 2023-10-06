<template>
  <div class="mt-1">
    <div class="row">
      <div class="col-12 col-md-4">
        <LayoutPageTitle/>
      </div>
      <div class="col-12 p-0 col-md-8 d-flex justify-content-end">
        <el-space>
          <el-select></el-select>
          <el-button class="bg-primary text-white" @click="AddPropertyPage"> Add Property</el-button>
          <el-button class="bg-primary text-white"> Export Options</el-button>
        </el-space>
      </div>
    </div>
    <el-divider class="mt-2"></el-divider>
    <div class="row justify-content-end">
      <div
          v-if="selectedIds.length > 0"
          class="col-9 px-0 mx-0 d-flex align-items-center justify-content-end"
      >
        <span class="me-2 fs-3">{{ selectedIds.length }}</span>
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
            @input="getProperties"
            placeholder="Search here..."
            clearable
        ></el-input>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col">
        <el-table
            :data="Properties"
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
          <el-table-column prop="titleNo" label="Title" width="180"/>
          <el-table-column prop="clientName" label="Client" width="220"/>
          <el-table-column prop="providerName" label="Provider"/>
          <el-table-column prop="address1" label="Address"/>
          <el-table-column prop="city" label="City"/>
          <el-table-column prop="country" label="Country"/>
          <el-table-column label="Actions" align="center" width="100">
            <template #default="scope">
              <el-space spacer="|" alignment="center">
                <router-link
                    to="/clients-details"
                    class="menu-link"
                    @click="SetPropertyId(scope.row.id)"
                >
                  <i
                      class="bi bi-pencil-square text-primary action-btn fs-6"
                  ></i>
                </router-link>
                <i
                    data-bs-toggle="modal"
                    data-bs-target="#deleteEntityModal"
                    class="bi bi-trash3 text-danger action-btn fs-6"
                    @click="(name = scope.row.titleNo), SetPropertyId(scope.row.id)"
                ></i>
              </el-space>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
  <DeleteEntity
      @deleteClientSuccess="getProperties"
      @on-items-select="onItemSelect"
      :entityId="propertyId"
      title="Property"
      :show="deleteModal"
      :name="name"
      slug="property"
  />
  <DeleteMultiple
      @deleteClientSuccess="getProperties"
      @on-items-select="onItemSelect"
      :entityId="propertyId"
      title="Properties"
      :show="deleteMultipleModal"
      :name="name"
      :no="selectedIds"
      slug="property"
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
  name: "ProportiesList",
  components: {
    DeleteMultiple,
    DeleteEntity,
    LayoutPageTitle

  },
  data() {
    return {
      deleteModal: true,
      deleteMultipleModal: true,
      HeaderStyle: HeaderStyle,
      propertyId: 0,
      name: "",
      loading: false,
      Properties: [],
      selectedIds: [],
      Filter: {
        clientId: 1,
        providerId: 0,
        search: "",
        sort: "",
        pageSize: 10,
        currentPage: 1,
        totalCount: 0,
      },
    };
  },
  methods: {
    handleSelectionChange(selection) {
      this.selectedIds = selection;
    },
    onItemSelect(selectedItems) {
      this.selectedIds = selectedItems;
    },
    SetPropertyId(id) {
      this.propertyId = id;
      sessionStorage.setItem("propertyId", id);
    },
    AddPropertyPage() {
      sessionStorage.removeItem("propertyId");
      this.$router.push("/property-details");
    },
    getMenu() {
      MenuComponent.reinitialization();
      MenuComponent.createInsance();
    },
    handleCurrentChange(newPage) {
      if (newPage !== undefined) {
        this.Filter.currentPage = newPage;
      }
      this.getProperties();
    },
    handleSizeChange(newSize) {
      if (newSize !== undefined) {
        this.Filter.pageSize = newSize;
      }
      this.getProperties();
    },
    async getProperties() {
      let response = await ApiService.get(
          "property",
          "getproperties?" +
          "clientId=" + this.Filter.clientId +
          "&providerId=" + this.Filter.providerId +
          "&search=" +
          this.Filter.search +
          "&sort=" +
          this.Filter.sort +
          "&limit=" +
          this.Filter.pageSize +
          "&page=" +
          this.Filter.currentPage
      );
      this.Properties = response.data.items ?? [];
      console.log(response)
    },
    async deleteClient(propertyId) {
      await ApiService.delete("property/?propertyId=" + propertyId);
      await this.getProperties();
    },
  },
  created() {
    sessionStorage.removeItem("propertyId");
    this.getProperties();
  },
};
</script>

<style scoped></style>
