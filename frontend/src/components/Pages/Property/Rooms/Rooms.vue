<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon
            icon-name="magnifier"
            icon-class="fs-1 position-absolute ms-6"
          />
          <input
            type="text"
            v-model="Filter.search"
            class="form-control form-control-solid w-250px ps-15"
            placeholder="Search Customers"
          />
        </div>
        <el-select
          v-model="Filter.propertyId"
          placeholder="Select"
          class="ms-md-2"
          @change="getRooms"
        >
          <el-option
            v-for="item in Properties"
            :key="item.id"
            :label="item.titleNo"
            :value="item.id"
            style="font-weight: normal; color: #0a0a0a"
          />
        </el-select>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->

      <div class="card-toolbar justify-content-end">
        <!--begin::Toolbar-->
        <div
          v-if="selectedIds.length === 0"
          class="d-flex justify-content-end"
          data-kt-customer-table-toolbar="base"
        >
          <!--begin::Export-->
          <button
            type="button"
            class="btn btn-light-primary me-3"
            data-bs-toggle="modal"
            data-bs-target="#kt_customers_export_modal"
          >
            <KTIcon icon-name="exit-up" icon-class="fs-2" />
            Export
          </button>
          <!--end::Export-->
          <!--begin::Add customer-->
          <router-link to="room-details">
            <button type="button" class="btn btn-primary">
              <KTIcon icon-name="plus" icon-class="fs-2" />
              Add Room
            </button>
          </router-link>
          <!--end::Add customer-->
        </div>
        <!--end::Toolbar-->
        <!--begin::Group actions-->
        <div
          v-else
          class="d-flex justify-content-end align-items-center"
          data-kt-customer-table-toolbar="selected"
        >
          <div class="fw-bold me-5">
            <span class="me-2">{{ selectedIds.length }}</span
            >Selected
          </div>
          <button type="button" class="btn btn-danger">Delete Selected</button>
        </div>
        <!--end::Group actions-->

      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <Datatable
        :data="Rooms"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="true"
        checkbox-label="id"
        @on-items-select="onItemSelect"
      >
        <template v-slot:roomName="{ row: room }">
          {{ room.roomName }}
        </template>
        <template v-slot:roomNo="{ row: room }">
          <a href="#" class="text-gray-600 text-hover-primary mb-1">
            {{ room.roomNo }}
          </a>
        </template>
        <template v-slot:coreRent="{ row: room }">
          {{ room.coreRent }}
        </template>
        <template v-slot:serviceCharge="{ row: room }">
          {{ room.serviceCharge }}
        </template>
        <template v-slot:tenant="{ row: room }">
          {{ room.tenant }}
        </template>
        <template v-slot:actions="{ row: room }">
          <a
            @click="getMenu"
            href="#"
            class="btn btn-sm btn-light btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
            >Actions
            <KTIcon icon-name="down" icon-class="fs-5 m-0" />
          </a>
          <!--begin::Menu-->
          <div
            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold fs-7 w-125px py-4"
            data-kt-menu="true"
          >
            <!--begin::Menu item-->
            <div class="menu-item px-3">
              <router-link to="/clients-details" class="menu-link px-3"
                >View
              </router-link>
            </div>
            <!--end::Menu item-->
            <!--begin::Menu item-->
            <div class="menu-item px-3"
                 data-bs-toggle="modal"
                 data-bs-target="#deleteEntityModal">
              <a @click="deleteClient(room.id)" class="menu-link px-3"
                >Delete</a
              >
            </div>
            <!--end::Menu item-->
          </div>
          <!--end::Menu-->
        </template>
      </Datatable>
    </div>
    <DeleteEntity
        @deleteClientSuccess="getProperties"
        @on-items-select="onItemSelect"
        :entityId="roomId"
        title="Client"
        :show="deleteModal"
        :name="name"
        slug="client"
    />
    <DeleteMultiple
        @deleteClientSuccess="getProperties"
        @on-items-select="onItemSelect"
        :entityId="roomId"
        title="Clients"
        :show="deleteMultipleModal"
        :name="name"
        :no="selectedIds"
        slug="client"
    />
  </div>
</template>

<script>
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import ApiService from "@/core/services/ApiService";
import { MenuComponent } from "../../../../assets/ts/components";
import DeleteEntity from "../../../UI/DeleteEntity.vue";
import DeleteMultiple from "../../../UI/DeleteMultiple.vue";
export default {
  name: "RoomsList",
  components: {
    Datatable,
    DeleteMultiple,
    DeleteEntity
  },
  data() {
    return {
      deleteMultipleModal:true,
      deleteModal:true,
      roomId:0,
      tableHeader: [
        {
          columnName: "Room Name",
          columnLabel: "roomName",
          sortEnabled: true,
          columnWidth: 175,
        },
        {
          columnName: "Room No",
          columnLabel: "roomNo",
          sortEnabled: true,
          columnWidth: 230,
        },
        {
          columnName: "Core Charges",
          columnLabel: "coreRent",
          sortEnabled: true,
          columnWidth: 175,
        },
        {
          columnName: "Service Charge",
          columnLabel: "serviceCharge",
          sortEnabled: true,
          columnWidth: 175,
        },
        {
          columnName: "Tenant",
          columnLabel: "tenant",
          sortEnabled: true,
          columnWidth: 200,
        },
        {
          columnName: "Actions",
          columnLabel: "actions",
          sortEnabled: false,
          columnWidth: 135,
        },
      ],
      Rooms: [],
      Pagination:{},
      selectedIds: [],
      Properties: [],
      Filter: {
        clientId: 0,
        providerId: 0,
        propertyId: 0,
        search: "",
        sort: "",
        limit: 100,
        page: 1,
      },
    };
  },
  methods: {
    onItemSelect(selectedItems) {
      this.selectedIds = selectedItems;
    },
    getMenu() {
      MenuComponent.reinitialization();
      MenuComponent.createInsance();
    },
    async getRooms() {
      let response = await ApiService.get(
        "room",
        "getrooms?" +
          "proId=" +
          this.Filter.propertyId +
          "&search=" +
          this.Filter.search +
          "&sort=" +
          this.Filter.sort +
          "&limit=" +
          this.Filter.limit +
          "&page=" +
          this.Filter.page
      );
      this.Rooms = response.data.items ?? [];
      console.log(response)
      this.Pagination.totalCount = response.data.totalCount;
      this.Pagination.currentPage = response.data.currentPage;
      this.Pagination.pageSize = response.data.pageSize;
    },
    async deleteClient(propertyId) {
      await ApiService.delete("room/?roomId=" + propertyId);
      await this.getRooms();
    },
    async getProperties() {
      let response = await ApiService.get(
        "property",
        "getproperties?" +
          "search=" +
          this.Filter.search +
          "&sort=" +
          this.Filter.sort +
          "&limit=" +
          this.Filter.limit +
          "&page=" +
          this.Filter.page
      );
      this.Properties = response.data.items ?? [];
      if (this.Properties.length > 0) {
        this.Filter.propertyId = this.Properties[0].id;
        this.getRooms();
      }
    },
  },
  created() {
    this.getProperties();
  },
};
</script>

<style scoped></style>
