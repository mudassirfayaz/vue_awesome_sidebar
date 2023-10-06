<template>
  <div
    id="addComplianceModal"
    class="modal fade"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-450px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header p-3" id="kt_modal_add_customer_header">
          <div class="d-flex justify-content-between w-100 align-items-center">
            <h3 class="fw-bold">{{ title }} Compliance</h3>
            <el-button text data-bs-dismiss="modal">
              <KTIcon icon-name="abstract-11" icon-class="fs-5 m-0" />
            </el-button>
          </div>
        </div>
        <div class="modal-body p-5">
          <el-form>
            <el-form-item prop="name">
              <label class="required">Title</label>
              <el-input v-model="Compliance.title" type="text" placeholder="" />
            </el-form-item>
            <div class="row">
              <div class="col d-flex flex-column">
                <label class="">Default Renew Value</label>
                <el-form-item prop="name" class="mt-2">
                  <el-input-number
                    class="w-100"
                    v-model="Compliance.defaultRenewValue"
                    :controls="false"
                  />
                </el-form-item>
              </div>
              <div class="col d-flex flex-column">
                <label class="">Default Renew Type</label>
                <el-form-item prop="name" class="mt-2">
                  <el-input-number
                    class="w-100"
                    v-model="Compliance.defaulRenewType"
                    :controls="false"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col d-flex flex-column">
                <label class="">Sort Order</label>
                <el-form-item prop="name" class="mt-2">
                  <el-input-number
                    class="w-100"
                    v-model="Compliance.sortOrder"
                    :controls="false"
                  />
                </el-form-item>
              </div>
              <div class="col d-flex flex-column">
                <label class="">Visible To Provider</label>
                <el-form-item prop="name" class="mt-2">
                  <el-switch
                    v-model="Compliance.isVisibleToProvider"
                    :controls="false"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col d-flex flex-column">
                <label class="">Is Default</label>
                <el-form-item prop="name" class="mt-2">
                  <el-switch
                    v-model="Compliance.isDefault"
                    type="text"
                    placeholder=""
                  />
                </el-form-item>
              </div>
              <div class="col d-flex flex-column">
                <label class="">Is Required</label>
                <el-form-item prop="name" class="mt-2">
                  <el-switch
                    v-model="Compliance.isRequired"
                    type="text"
                    placeholder=""
                  />
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-sm btn-secondary"
            type="reset"
            data-bs-dismiss="modal"
            id="deleteEntityModal_cancel"
          >
            Cancel
          </button>
          <button
            class="btn btn-sm btn-primary"
            data-bs-dismiss="modal"
            @click="addCompliance"
          >
            {{ addBtnText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "../../../core/services/ApiService";
import { ShowMessage } from "../../UI/ShowMessage";

export default {
  name: "AddCompliacne",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      ShowDialog: true,
      addBtnText: "Add",
      Compliance: {
        id: 0,
        title: "",
        isDefault: true,
        sortOrder: 0,
        isRequired: true,
        defaultRenewValue: 0,
        defaulRenewType: 0,
        isVisibleToProvider: true,
      },
    };
  },
  methods: {
    addCompliance: async function () {
      try {
        let response = await ApiService.post(
          "compliance/add",
          this.Compliance
        );
        if (response.status === 200) {
          ShowMessage("success", "Compliance added successfully");
          this.$emit("complianceAddSuccess");
        }
      } catch (e) {
        console.log(e);
        ShowMessage("error", "Something went wrong!");
      }
    },
  },
};
</script>

<style scoped></style>
