<template>
  <div>
    <router-link to="/rooms">
      <el-button class="el-icon--left mb-2">
        <el-icon>
          <KTIcon icon-name="arrow-left" icon-class="fs-2 me-3"/>
        </el-icon>
        Back
      </el-button>
    </router-link>
    <div class="card p-7">
      <div class="row">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <h1>Room</h1>
          <el-form-item prop="name" v-if="editBtnDisabled">
            <button
                @click="editBtnDisabled = !editBtnDisabled"
                class="btn btn-sm btn-primary"
                type="submit"
            >
              <span
                  v-if="!loading"
                  class="d-flex justify-content-between align-items-center"
              >
                <span class="me-2">Edit</span>
                <KTIcon icon-name="notepad-edit" icon-class="fs-2 me-0"/>
              </span>
            </button>
          </el-form-item>
          <el-form-item prop="name" v-else>
            <button :disabled="!Room.roomName"
                @click="AddOrUpdateRoom"
                class="btn btn-sm btn-primary"
                type="submit"
            >
              <span
                  v-if="!loading"
                  class="d-flex justify-content-between align-items-center"
              >
                <span class="me-2">{{ updateBtnText }}</span>
                <KTIcon icon-name="notepad-edit" icon-class="fs-2 me-0"/>
              </span>
            </button>
          </el-form-item>
        </div>
      </div>
      <el-divider class="mt-0"></el-divider>
      <div class="row">
        <div class="col-12 col-md-6 col-lg-4">
          <el-form-item>
            <label class="required">Room Name</label>
            <el-input v-model="Room.roomName"></el-input>
          </el-form-item>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <el-form-item>
            <label class="">Property</label>
            <el-select
                :disabled="viewMode"
                v-model="Room.propertyId"
                placeholder="Select"
            >
              <el-option
                  v-for="item in Properties"
                  :key="item.id"
                  :label="item.titleNo"
                  :value="item.id"
                  style="font-weight: normal; color: #0a0a0a"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <el-form-item>
            <label class="">Room No</label>
            <el-input-number :controls="false" class="w-100" v-model="Room.roomNo"></el-input-number>
          </el-form-item>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <el-form-item>
            <label class="">Core Rent</label>
            <el-input-number :controls="false" class="w-100" v-model="Room.coreRent" :min="0"></el-input-number>
          </el-form-item>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <el-form-item>
            <label class="">Service Charge</label>
            <el-input-number :controls="false" class="w-100" v-model="Room.serviceCharge" :min="0"></el-input-number>
          </el-form-item>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <el-form-item>
            <label class="">Personal Charge</label>
            <el-input-number :controls="false" class="w-100" v-model="Room.personalCharge" :min="0"></el-input-number>
          </el-form-item>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <el-form-item>
            <label class="">Tenant</label>
            <el-input v-model="Room.tenant" class="w-100"></el-input>
          </el-form-item>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <el-form-item>
            <label class="">Tenancy Start Date</label>
            <el-date-picker v-model="Room.tenancyStartDate" class="w-100"></el-date-picker>
          </el-form-item>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <el-form-item>
            <label class="">Tenancy End Date</label>
            <el-date-picker v-model="Room.tenancyEndDate" class="w-100"></el-date-picker>
          </el-form-item>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <el-form-item>
            <label class="">Active</label>
            <el-switch v-model="Room.isActive" class="w-100"></el-switch>
          </el-form-item>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <el-form-item>
            <label class="">Tenant Moving</label>
            <el-switch v-model="Room.isTenantIsMoving" class="w-100"></el-switch>
          </el-form-item>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <el-form-item>
            <label class="">Tenant Leaving</label>
            <el-switch v-model="Room.isTenantLeaving" class="w-100"></el-switch>
          </el-form-item>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "../../../../core/services/ApiService";
import {ShowMessage} from "../../../UI/ShowMessage";

export default {
  name: "AddRoom",
  data() {
    return {
      editBtnDisabled: false,
      updateBtnText: "Add Room",
      loading: false,
      viewMode: false,
      Room: {
        id: 0,
        propertyId: 0,
        tenantId: 0,
        tenant: "",
        roomNo: 0,
        roomName: "",
        tenancyStartDate: new Date(),
        tenancyEndDate: new Date(),
        coreRent: 0,
        serviceCharge: 0,
        personalCharge: 0,
        isTenantIsMoving: true,
        isTenantLeaving: true,
        isActive: true,
      },
      Filter: {
        clientId: 1,
        providerId: 1,
        search: "",
        sort: "",
        limit: 10,
        page: 1,
      },
      Properties: [],
    };
  },
  methods: {
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
      this.Room.propertyId = this.Properties[0].id ?? 0;
    },
    AddOrUpdateRoom: async function () {
      switch (this.Room.id) {
        case 0:
          await this.AddRoom();
          break;
        default:
          await this.UpdateRoom();
          break;
      }
    },
    async UpdateRoom() {
      try {
        let response = await ApiService.put("room/update", this.Room);
        switch (response.status) {
          case 200:
            ShowMessage("success", "Room updated successfully");
            break;
          default:
            ShowMessage("error", "Something went wrong!");
        }
      } catch (e) {
        console.log(e);
        ShowMessage("error", "Something went wrong!");
      }
    },
    AddRoom: async function () {
      try {
        console.log(this.Room);
        // eslint-disable-next-line no-unreachable
        let response = await ApiService.post("room/add", this.Room);
        console.log(response);
        switch (response.status) {
          case 200:
            ShowMessage("success", "Room added successfully");
            break;
          default:
            ShowMessage("error", "Something went wrong!");
        }
      } catch (e) {
        console.log(e);
        ShowMessage("error", "Something went wrong!");

      }
    },
  },
  created() {
    this.getProperties();
  }
};
</script>

<style scoped></style>
