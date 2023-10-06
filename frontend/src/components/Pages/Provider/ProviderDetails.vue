<template>
  <router-link to="/providers">
    <el-button class="el-icon--left mb-2">
      <el-icon>
        <KTIcon icon-name="arrow-left" icon-class="fs-2 me-3" />
      </el-icon>
      Back
    </el-button>
  </router-link>
  <div class="row justify-content-between">
    <div class="col-12 col-md-4 mb-5 mb-md-0">
      <div class="card p-7 h-100 d-flex flex-column align-items-center">
        <el-avatar :size="120" src="/media/avatars/300-7.jpg"></el-avatar>
        <h1 class="mt-5 mb-0">{{ StaticProvider.name }}</h1>
        <el-divider
          v-if="updateBtnText !== 'Add Client'"
          border-style="dashed"
          class="mt-2"
        ></el-divider>
        <div
          class="text-gray-600"
          v-if="updateBtnText !== 'Add Provider'"
          style="width: 100%"
        >
          <span>{{ StaticProvider.displayName ?? "Name" }}</span>
          <el-divider class="mt-2"></el-divider>
          <span>{{ StaticProvider.email }}</span>
          <el-divider class="mt-2"></el-divider>
          <span>{{ StaticProvider.mobile }}</span>
          <el-divider class="mt-2"></el-divider>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-8">
      <div class="card p-7">
        <div class="row">
          <div class="col-12 d-flex justify-content-between align-items-center">
            <h1>Profile</h1>
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
                  <KTIcon icon-name="notepad-edit" icon-class="fs-2 me-0" />
                </span>
              </button>
            </el-form-item>
            <el-form-item prop="name" v-else>
              <button
                @click="AddOrUpdateClient"
                class="btn btn-sm btn-primary"
                type="submit"
              >
                <span
                  v-if="!loading"
                  class="d-flex justify-content-between align-items-center"
                >
                  <span class="me-2">{{ updateBtnText }}</span>
                  <KTIcon icon-name="notepad-edit" icon-class="fs-2 me-0" />
                </span>
              </button>
            </el-form-item>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="row">
          <div class="col-12 col-md-6">
            <label class="fs-6 fw-semobold mb-2">Name</label>
            <el-form-item prop="name">
              <el-input
                :disabled="editBtnDisabled"
                v-model="Provider.name"
                type="text"
                placeholder=""
              />
            </el-form-item>
          </div>
          <div class="col-12 col-md-6">
            <label class="fs-6 fw-semobold mb-2">Email</label>
            <el-form-item prop="name">
              <el-input
                :disabled="editBtnDisabled"
                v-model="Provider.email"
                type="text"
                placeholder=""
              />
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-6">
            <label class="fs-6 fw-semobold mb-2">Phone</label>
            <el-form-item prop="name">
              <el-input
                :disabled="editBtnDisabled"
                v-model="Provider.mobile"
                type="text"
                placeholder=""
              />
            </el-form-item>
          </div>
          <div class="col-12 col-md-6">
            <label class="fs-6 fw-semobold mb-2">Is Active</label>
            <el-form-item prop="name">
              <el-switch
                :disabled="editBtnDisabled"
                v-model="Provider.isActive"
              />
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-6">
            <label class="fs-6 fw-semobold mb-2">Client Id</label>
            <el-form-item prop="name">
              <el-input-number
                :controls="false"
                :disabled="editBtnDisabled"
                v-model="Provider.clientId"
                type="number"
              />
            </el-form-item>
          </div>
          <div class="col-12 col-md-6">
            <label class="fs-6 fw-semobold mb-2">Client Name </label>
            <el-form-item prop="name">
              <el-input
                :disabled="editBtnDisabled"
                v-model="Provider.clientName"
                type="text"
                placeholder=""
              />
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-6">
            <label class="fs-6 fw-semobold mb-2">City</label>
            <el-form-item prop="name">
              <el-input
                :disabled="editBtnDisabled"
                v-model="Provider.city"
                type="text"
                placeholder=""
              />
            </el-form-item>
          </div>
          <div class="col-12 col-md-6">
            <label class="fs-6 fw-semobold mb-2">Country</label>
            <el-form-item prop="name">
              <el-input
                :disabled="editBtnDisabled"
                v-model="Provider.county"
                type="text"
                placeholder=""
              />
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-6">
            <label class="fs-6 fw-semobold mb-2">Postal Code</label>
            <el-form-item prop="name">
              <el-input
                :disabled="editBtnDisabled"
                v-model="Provider.postCode"
                type="text"
                placeholder=""
              />
            </el-form-item>
          </div>
          <div class="col-12 col-md-6">
            <label class="fs-6 fw-semobold mb-2">Address 1</label>
            <el-form-item prop="name">
              <el-input
                :disabled="editBtnDisabled"
                v-model="Provider.address1"
                type="text"
                placeholder=""
              />
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-6">
            <label class="fs-6 fw-semobold mb-2">Address 2</label>
            <el-form-item prop="name">
              <el-input
                :disabled="editBtnDisabled"
                v-model="Provider.address2"
                type="text"
                placeholder=""
              />
            </el-form-item>
          </div>
          <div class="col-12 col-md-6">
            <label class="fs-6 fw-semobold mb-2">Address 3</label>
            <el-form-item prop="name">
              <el-input
                :disabled="editBtnDisabled"
                v-model="Provider.address3"
                type="text"
                placeholder=""
              />
            </el-form-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "../../../core/services/ApiService";
import { ShowMessage } from "../../UI/ShowMessage";

export default {
  name: "ProviderDetails",
  components: {},

  data() {
    return {
      updateBtnText: "Update",
      editBtnDisabled: true,
      loading: false,
      StaticProvider: {},
      Provider: {
        id: sessionStorage.getItem("providerId"),
        clientId: 0,
        name: "",
        email: "",
        mobile: "",
        address1: "",
        address2: "",
        address3: "",
        postCode: "",
        city: "",
        county: "",
        clientName: "",
        isActive: true,
      },
    };
  },
  methods: {
    async getProvider() {
      try {
        let response = await ApiService.get(
          "provider",
          "getproviderbyid?providerId=" + this.Provider.id
        );
        this.Provider = response.data ?? {};
        this.StaticProvider = JSON.parse(JSON.stringify(this.Provider));
      } catch (e) {
        console.log(e);
        ShowMessage("error", "Something went wrong!");
      }
    },
    AddOrUpdateClient: async function () {
      switch (this.Provider.id) {
        case 0:
          await this.AddProvider();
          break;
        default:
          await this.UpdateProvider();
          break;
      }
    },
    UpdateProvider: async function () {
      try {
        let response = await ApiService.put("provider/update", this.Provider);

        switch (response.status) {
          case 200:
            ShowMessage("success", "Provider updated successfully");
            this.getProvider();
            break;
          default:
            ShowMessage("error", "Something went wrong!");
        }
      } catch (e) {
        console.log(e);
        ShowMessage("error", "Something went wrong!");
      }
    },
    async AddProvider() {
      try {
        let response = await ApiService.post("provider/add", this.Provider);
        switch (response.status) {
          case 200:
            ShowMessage("success", "Provider added successfully");
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
    if (sessionStorage.getItem("providerId") !== null) {
      this.getProvider();
    } else {
      this.Provider.id = 0;
      this.updateBtnText = "Add Provider";
      this.editBtnDisabled = false;
    }
  },
};
</script>

<style scoped></style>
