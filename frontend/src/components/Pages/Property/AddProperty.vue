<template>
  <div>
    <router-link to="/property">
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
          <h1>Property</h1>
          <el-form-item prop="name" v-if="viewMode">
            <button
                @click="viewMode = !viewMode"
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
            <button
                @click="AddOrUpdateProperty"
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
          <el-form>
            <el-form-item>
              <label class="required">Title No</label>
              <el-input
                  :disabled="viewMode"
                  v-model="Property.titleNo"
                  type="text"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <el-form>
            <el-form-item>
              <label class="required">Client</label>
              <el-select
                  :disabled="viewMode"
                  v-model="client"
                  placeholder="Select"
              >
                <el-option
                    v-for="item in Clients"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    style="font-weight: normal; color: #0a0a0a"
                    @click="SetClient(item)"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <el-form>
            <el-form-item>
              <label class="required">Provider</label>
              <el-select
                  :disabled="viewMode"
                  v-model="provider"
                  placeholder="Select"
              >
                <el-option
                    v-for="item in Providers"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    style="font-weight: normal; color: #0a0a0a"
                    @click="SetProvider(item)"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <el-form>
            <el-form-item>
              <label>Last Reg No</label>
              <el-input-number
                  :disabled="viewMode"
                  :controls="false"
                  v-model="Property.lastRegNumber"
                  class="align-start w-100"
              ></el-input-number>
            </el-form-item>
          </el-form>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <el-form>
            <el-form-item>
              <label>Local Authority</label>
              <el-input-number
                  :disabled="viewMode"
                  :controls="false"
                  v-model="Property.localAuth"
                  class="text-start w-100"
              ></el-input-number>
            </el-form-item>
          </el-form>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <el-form>
            <el-form-item>
              <label>No of Rooms</label>
              <el-input-number
                  :disabled="viewMode"
                  :controls="false"
                  v-model="Property.numberOfRooms"
                  class="text-start w-100"
              ></el-input-number>
            </el-form-item>
          </el-form>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <el-form>
            <el-form-item>
              <label>No of Rooms</label>
              <el-input-number
                  :disabled="viewMode"
                  :controls="false"
                  v-model="Property.numberOfRooms"
                  class="text-start w-100"
              ></el-input-number>
            </el-form-item>
          </el-form>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <el-form>
            <el-form-item>
              <label>Area Id</label>
              <el-input-number
                  :disabled="viewMode"
                  :controls="false"
                  v-model="Property.areaId"
                  class="text-start w-100"
              ></el-input-number>
            </el-form-item>
          </el-form>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <el-form>
            <el-form-item>
              <label>Agent Id</label>
              <el-input-number
                  :disabled="viewMode"
                  :controls="false"
                  v-model="Property.agentId"
                  class="text-start w-100"
              ></el-input-number>
            </el-form-item>
          </el-form>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <el-form>
            <el-form-item>
              <label>Date SLA Start</label>
              <el-date-picker
                  :disabled="viewMode"
                  v-model="Property.dateSlaStart"
                  class="w-100"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <el-form>
            <el-form-item>
              <label>Date SLA End</label>
              <el-date-picker
                  :disabled="viewMode"
                  v-model="Property.dateSlaEnd"
                  class="w-100"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <el-form>
            <el-form-item>
              <label>Date Lease Start</label>
              <el-date-picker
                  :disabled="viewMode"
                  v-model="Property.dateLeaseStart"
                  class="w-100"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <el-form>
            <el-form-item>
              <label>Date Lease End</label>
              <el-date-picker
                  :disabled="viewMode"
                  v-model="Property.dateLeaseEnd"
                  class="w-100"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <el-form>
            <el-form-item>
              <label>Date Pre Accept Insp</label>
              <el-date-picker
                  :disabled="viewMode"
                  v-model="Property.datePreAcceptInsp"
                  class="w-100"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <el-form>
            <el-form-item>
              <label>Date Inspection</label>
              <el-date-picker
                  :disabled="viewMode"
                  v-model="Property.dateInspection"
                  class="w-100"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <el-form>
            <el-form-item>
              <label>Date Exempt</label>
              <el-date-picker
                  :disabled="viewMode"
                  v-model="Property.dateExempt"
                  class="w-100"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <el-form>
            <el-form-item>
              <label>Date Quarterly Audit</label>
              <el-date-picker
                  :disabled="viewMode"
                  v-model="Property.dateQuarterlyAudit"
                  class="w-100"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <el-form>
            <el-form-item>
              <label>Date Quarterly Insp</label>
              <el-date-picker
                  :disabled="viewMode"
                  v-model="Property.dateQuarterlyInsp"
                  class="w-100"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "../../../core/services/ApiService";
import {ShowMessage} from "../../UI/ShowMessage";

export default {
  name: "AddProperty",
  data() {
    return {
      updateBtnText: "Add Property",
      editBtnDisabled: false,
      viewMode: false,
      loading: false,
      Property: {
        id: sessionStorage.getItem("propertyId"),
        clientId: 0,
        providerId: 0,
        areaId: 0,
        agentId: 0,
        address1: "",
        address2: "",
        address3: "",
        city: "",
        postCode: "",
        county: "",
        country: 0,
        fireExitBlanket: 0,
        numberOfRooms: 0,
        titleNo: "",
        lastRegNumber: 0,
        localAuth: 0,
        dateSlaStart: new Date(),
        dateSlaEnd: new Date(),
        dateLeaseStart: new Date(),
        dateLeaseEnd: new Date(),
        datePreAcceptInsp: new Date(),
        dateInspection: new Date(),
        dateExempt: new Date(),
        dateQuarterlyAudit: new Date(),
        dateQuarterlyInsp: new Date(),
        isPublished: true,
        clientName: "",
        providerName: "",
      },
      Providers: [],
      Clients: [],
      provider: {},
      client: {},
      Filter: {
        clientId: sessionStorage.getItem("clientId"),
        providerId: sessionStorage.getItem("providerId"),
        search: "",
        sort: "",
        limit: 10,
        page: 1,
      },
    };
  },
  methods: {
    SetProvider(item) {
      console.log(item)
      this.Property.providerName = item.name;
      this.Property.providerId = item.id;
    },
    SetClient(item) {
      console.log(item)
      this.Property.clientName = item.name;
      this.Property.clientId = item.id;
      this.getProviders();
    },
    AddOrUpdateProperty: async function () {
      switch (this.Property.id) {
        case 0:
          await this.AddProperty();
          break;
        default:
          await this.UpdateProperty();
          break;
      }

    },
    async getProviders() {
      let response = await ApiService.get(
          "provider",
          "getproviders?clientId=" +
          this.Property.clientId +
          "&search=" +
          this.Filter.search +
          "&sort=" +
          this.Filter.sort +
          "&limit=" +
          this.Filter.limit +
          "&page=" +
          this.Filter.page
      );
      this.Providers = response.data.items ?? [];
      if (this.Providers.length === 0) {
        this.provider = "";
      } else {
        this.Property.providerId = this.Providers[0].id;
        this.Property.providerName = this.Providers[0].name;
        this.provider = {}
      }
    },
    async getClients() {
      let response = await ApiService.get(
          "client",
          "getclients?search=" +
          this.Filter.search +
          "&sort=" +
          this.Filter.sort +
          "&limit=" +
          this.Filter.limit +
          "&page=" +
          this.Filter.page
      );
      this.Clients = response.data.items ?? [];
      if (this.Clients.length > 0) {
        this.Property.clientId = this.Clients[0].id;
        this.Property.clientName = this.Clients[0].name;
        this.getProviders();
      }
    },
    async UpdateProperty() {
      try {
        let response = await ApiService.put("property/update", this.Property);
        switch (response.status) {
          case 200:
            ShowMessage("success", "Property updated successfully");
            break;
          default:
            ShowMessage("error", "Something went wrong!");
        }
      } catch (e) {
        console.log(e);
        ShowMessage("error", "Something went wrong!");
      }
    },
    AddProperty: async function () {
      try {
        console.log(this.Property);
        // eslint-disable-next-line no-unreachable
        let response = await ApiService.post("property/add", this.Property);
        switch (response.status) {
          case 200:
            ShowMessage("success", "Property added successfully");
            break;
          default:
            ShowMessage("error", "Something went wrong!");
        }
      } catch (e) {
        console.log(e);
        ShowMessage("error", "Something went wrong!");

      }
    },
    async getProperty() {
      let response = await ApiService.get(
          "property",
          "getpropertybyid?" +
          "propertyId=" + this.Property.id
      );
      this.Property = response.data;
      console.log(this.Property)
    },
  },
  created() {
    this.getClients();
    if (sessionStorage.getItem("propertyId") !== null) {
      this.getProperty();
      this.updateBtnText = "Update Property";
      this.viewMode = true;
    } else {
      this.Property.id = 0;
      this.updateBtnText = "Add Property";
      this.editBtnDisabled = false;
    }
  },
};
</script>

<style scoped>
.align-start .el-input-number__input {
  text-align: start !important;
}
</style>
