<template>
  <router-link to="/clients">
    <el-button class="el-icon--left mb-2">
      <el-icon>
        <KTIcon icon-name="arrow-left" icon-class="fs-2 me-3"/>
      </el-icon>
      Back
    </el-button>
  </router-link>
  <div class="row justify-content-between">
    <div class="col-12 col-md-4 mb-5 mb-md-0">
      <div class="card p-7 h-100 d-flex flex-column align-items-center">
        <el-avatar :size="120" src="/media/avatars/300-7.jpg"></el-avatar>
        <h1 class="mt-5 mb-0">{{ StaticClient.name }}</h1>
        <el-divider v-if="updateBtnText !== 'Add Client'" border-style="dashed" class="mt-2"></el-divider>
        <div class="text-gray-600" v-if="updateBtnText !== 'Add Client'" style="width: 100%">
          <span>{{StaticClient.displayName ?? 'Name'}}</span>
          <el-divider class="mt-2"></el-divider>
          <span>{{StaticClient.email}}</span>
          <el-divider class="mt-2"></el-divider>
          <span>{{ StaticClient.mobile }}</span>
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
              <KTIcon icon-name="notepad-edit" icon-class="fs-2 me-0"/>
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
              <KTIcon icon-name="notepad-edit" icon-class="fs-2 me-0"/>
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
                  v-model="Client.name"
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
                  v-model="Client.email"
                  type="text"
                  placeholder=""
              />
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4">
            <label class="fs-6 fw-semobold mb-2">Phone</label>
            <el-form-item prop="name">
              <el-input
                  :disabled="editBtnDisabled"
                  v-model="Client.mobile"
                  type="text"
                  placeholder=""
              />
            </el-form-item>
          </div>
          <div class="col-12 col-md-4">
            <label class="fs-6 fw-semobold mb-2">User Email</label>
            <el-form-item prop="name">
              <el-input
                  :disabled="editBtnDisabled"
                  v-model="Client.userEmail"
                  type="text"
                  placeholder=""
              />
            </el-form-item>
          </div>
          <div class="col-12 col-md-4">
            <label class="fs-6 fw-semobold mb-2">Password</label>
            <el-form-item prop="name">
              <el-input
                  :disabled="editBtnDisabled"
                  v-model="Client.password"
                  type="text"
                  placeholder=""
              />
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-6">
            <label class="fs-6 fw-semobold mb-2">Desplay Name</label>
            <el-form-item prop="name">
              <el-input
                  :disabled="editBtnDisabled"
                  v-model="Client.displayName"
                  type="text"
                  placeholder=""
              />
            </el-form-item>
          </div>
          <div class="col-12 col-md-6">
            <label class="fs-6 fw-semobold mb-2">Website</label>
            <el-form-item prop="name">
              <el-input
                  :disabled="editBtnDisabled"
                  v-model="Client.website"
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
                  v-model="Client.city"
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
                  v-model="Client.county"
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
                  v-model="Client.postCode"
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
                  v-model="Client.address1"
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
                  v-model="Client.address2"
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
                  v-model="Client.address3"
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
import {ShowMessage} from "../../UI/ShowMessage";

export default {
  name: "ClientDetails",
  components: {},

  data() {
    return {
      updateBtnText: "Update",
      editBtnDisabled: true,
      loading: false,
      StaticClient:{},
      Client: {
        id: sessionStorage.getItem("clientId"),
        name: "",
        email: "",
        mobile: "",
        website: "",
        address1: "",
        address2: "",
        address3: "",
        postCode: "",
        city: "",
        county: "",
        displayName: "",
        userEmail: "",
        password: "",
        isActive: true
      },
    };
  },
  methods: {
    async getClient() {
      try {
        let response = await ApiService.get(
            "client",
            "getclientbyid?clientId=" + this.Client.id
        );
        this.Client = response.data ?? {};
        this.StaticClient = JSON.parse(JSON.stringify(this.Client));
      } catch (e) {
        console.log(e);
        ShowMessage("error", "Something went wrong!");
      }
    },
    AddOrUpdateClient: async function () {
      console.log(this.Client.id)
      switch (this.Client.id) {
        case 0:
          await this.AddClient();
          break;
        default:
          await this.UpdateClient();
          break;
      }

    },
    async UpdateClient() {
      try {
        let response = await ApiService.put("client/update", this.Client);
        switch (response.status) {
          case 200:
            ShowMessage("success", "Client updated successfully");
            break;
          default:
            ShowMessage("error", "Something went wrong!");
        }
      } catch (e) {
        console.log(e);
        ShowMessage("error", "Something went wrong!");
      }
    },
    async AddClient() {
      try {
        let response = await ApiService.post("client/add", this.Client);
        console.log(response);
        switch (response.status) {
          case 200:
            ShowMessage("success", "Client added successfully");
            break;
          default:
            ShowMessage("error", "Something went wrong!");
        }
      } catch (e) {
        console.log(e);
        ShowMessage("error", "Something went wrong!");

      }
    }
  },
  created() {
    if (sessionStorage.getItem("clientId") !== null) {
      this.getClient();
    } else {
      this.Client.id = 0;
      this.updateBtnText = "Add Client";
      this.editBtnDisabled = false;
    }
  },
};
</script>

<style scoped>

</style>
