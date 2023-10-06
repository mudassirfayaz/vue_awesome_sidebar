<template>
  <div class="mt-1">
    <div class="row">
      <div class="col-12 col-md-4">
        <LayoutPageTitle />
      </div>
      <div class="col-12 p-0 col-md-8 d-flex justify-content-end">
        <el-space>
          <el-select></el-select>
          <el-button
            class="bg-primary text-white"
            data-bs-toggle="modal"
            data-bs-target="#addComplianceModal"
          >
            Add Compliance</el-button
          >
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
          @input="getCompliance"
          placeholder="Search here..."
          clearable
        ></el-input>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col">
        <el-table
          :data="Compliances"
          v-loading="loading"
          :header-cell-style="HeaderStyle"
          :style="{ width: '100%' }"
          stripe
          border
          fit
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
          <el-table-column prop="title" label="Title" />
          <el-table-column label="Required">
            <template #default="scope">
              <el-tag v-if="scope.row.isRequired" type="success">Yes</el-tag>
              <el-tag v-else type="danger">No</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="Actions" align="center" width="100">
            <template #default="scope">
              <el-space spacer="|" alignment="center">
                <router-link
                  to="/provider_details"
                  class="menu-link"
                  @click="SetComplianceId(scope.row.id)"
                >
                  <i
                    class="bi bi-pencil-square text-primary action-btn fs-6"
                  ></i>
                </router-link>
                <i
                  data-bs-toggle="modal"
                  data-bs-target="#deleteEntityModal"
                  class="bi bi-trash3 text-danger action-btn fs-6"
                  @click="
                    (name = scope.row.title), SetComplianceId(scope.row.id)
                  "
                ></i>
              </el-space>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>

  <DeleteEntity
    @deleteClientSuccess="getCompliance"
    :entityId="complianceId"
    title="Provider"
    :show="deleteModal"
    :name="name"
    slug="provider"
  />
  <DeleteMultiple
    @deleteClientSuccess="getCompliance"
    @on-items-select="onItemSelect"
    :entityId="complianceId"
    title="Providers"
    :show="deleteMultipleModal"
    :name="name"
    :no="selectedIds"
    slug="provider"
  />

  <AddCompliacne :title="title" @complianceAddSuccess="getCompliance" />
</template>

<script>
import ApiService from "@/core/services/ApiService";
import { MenuComponent } from "../../../assets/ts/components";
import AddCompliacne from "./AddCompliance.vue";
import { HeaderStyle } from "../../UI/StyleJs";
import LayoutPageTitle from "../../../layouts/main-layout/toolbar/PageTitle.vue";
import DeleteEntity from "../../UI/DeleteEntity.vue";
import DeleteMultiple from "../../UI/DeleteMultiple.vue";
export default {
  name: "ComplianceListing",
  components: {
    AddCompliacne,
    LayoutPageTitle,
    DeleteEntity,
    DeleteMultiple
  },
  data() {
    return {
      title: "Add",
      loading: false,
      selectedRows: [],
      deleteMultipleModal: true,
      deleteModal: true,
      complianceId: 0,
      HeaderStyle: HeaderStyle,
      name:"",
      Compliances: [],
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
      this.selectedRows = selection;
    },
    onItemSelect(selectedItems) {
      this.selectedRows = selectedItems;
    },
    SetComplianceId(id) {
      this.complianceId = id;
      sessionStorage.setItem("complianceId", id);
    },
    getMenu() {
      MenuComponent.reinitialization();
      MenuComponent.createInsance();
    },
    handleCurrentChange(newPage) {
      if (newPage !== undefined) {
        this.Filter.currentPage = newPage;
      }
      this.getCompliance();
    },
    handleSizeChange(newSize) {
      if (newSize !== undefined) {
        this.Filter.pageSize = newSize;
      }
      this.getCompliance();
    },
    async getCompliance() {
      let response = await ApiService.get(
        "compliance",
        "getcompliances?search=" +
          this.Filter.search +
          "&sort=" +
          this.Filter.sort +
          "&limit=" +
          this.Filter.pageSize +
          "&page=" +
          this.Filter.currentPage
      );
      this.Compliances = response.data.items ?? [];
    },
    async deleteClient(clientId) {
      await ApiService.delete("client/?clientId=" + clientId);
      await this.getCompliance();
    },
  },
  created() {
    this.getCompliance();
  },
};
</script>

<style scoped></style>
