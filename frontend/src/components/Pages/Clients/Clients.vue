<template>
  <div class="mt-1">
    <div class="row">
      <div class="col-12 col-md-4">
        <LayoutPageTitle />
      </div>
      <div class="col-12 p-0 col-md-8 d-flex justify-content-end">
        <el-space>
          <el-select></el-select>
          <el-button class="bg-primary text-white" @click="AddClientPage"> Add Client</el-button>
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
            @input="getClients"
            clearable
            placeholder="Search here..."
        ></el-input>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col">
        <el-table
            :data="Clients"
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
                    to="/clients-details"
                    class="menu-link"
                    @click="SetClientId(scope.row.id)"
                >
                  <i
                      class="bi bi-pencil-square text-primary action-btn fs-6"
                  ></i>
                </router-link>
                <i
                    data-bs-toggle="modal"
                    data-bs-target="#deleteEntityModal"
                    class="bi bi-trash3 text-danger action-btn fs-6"
                    @click="(name = scope.row.name), SetClientId(scope.row.id)"
                ></i>
              </el-space>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>

  <DeleteEntity
      @deleteClientSuccess="getClients"
      @on-items-select="onItemSelect"
      :entityId="complianceId"
      title="Client"
      :show="deleteModal"
      :name="name"
      slug="client"
  />
  <DeleteMultiple
      @deleteClientSuccess="getClients"
      @on-items-select="onItemSelect"
      :entityId="complianceId"
      title="Clients"
      :show="deleteMultipleModal"
      :name="name"
      :no="selectedRows"
      slug="client"
  />
</template>

<script>
// import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import ApiService from "@/core/services/ApiService";
import {MenuComponent} from "../../../assets/ts/components";
import DeleteEntity from "../../UI/DeleteEntity.vue";
import DeleteMultiple from "../../UI/DeleteMultiple.vue";
import {HeaderStyle} from "../../UI/StyleJs";
import LayoutPageTitle from "../../../layouts/main-layout/toolbar/PageTitle.vue";

export default {
  name: "ClientsComp",
  components: {
    LayoutPageTitle,
    DeleteMultiple,
    DeleteEntity,
    // Datatable,
  },
  data() {
    return {
      loading: false,
      HeaderStyle: HeaderStyle,
      deleteModal: true,
      deleteMultipleModal: true,
      selectedRows: [],
      name: "",
      complianceId: 0,
      selectedIds: [],
      Clients: [],
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
    AddClientPage() {
      sessionStorage.removeItem("clientId");
      this.$router.push("/clients-details");
    },
    SetClientId(id) {
      this.clientId = id;
      sessionStorage.setItem("clientId", id);
    },
    getMenu() {
      MenuComponent.reinitialization();
      MenuComponent.createInsance();
    },
    handleCurrentChange(newPage) {
      if (newPage !== undefined) {
        this.Filter.currentPage = newPage;
      }
      this.getClients();
    },
    handleSizeChange(newSize) {
      if (newSize !== undefined) {
        this.Filter.pageSize = newSize;
      }
      this.getClients();
    },
    async getClients() {
      try {
        this.loading = true;
        let response = await ApiService.get(
            "client",
            "getclients?search=" +
            this.Filter.search +
            "&sort=" +
            this.Filter.sort +
            "&limit=" +
            this.Filter.pageSize +
            "&page=" +
            this.Filter.currentPage
        );
        this.Clients = response.data.items ?? [];
        this.Filter.totalCount = response.data.totalCount;
        this.Filter.currentPage = response.data.currentPage;
        this.Filter.pageSize = response.data.pageSize;
        this.loading = false;
      } catch (e) {
        this.loading = false;
        console.log(e);
      }
    },
    onItemSelect(selectedItems) {
      this.selectedIds = selectedItems;
    },
    customHeaderClass() {
      return "custom-header";
    },
  },
  created() {
    sessionStorage.removeItem("clientId");
    this.getClients();
  },
};
</script>

<style scoped>
.custom-table .el-table__header {
  background-color: #ff0000; /* Replace with your desired color */
  color: #ffffff; /* Replace with your desired text color */
}
</style>
