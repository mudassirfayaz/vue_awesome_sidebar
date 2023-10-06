<template>
  <div
      class="modal fade"
      id="addClientModal"
      ref="addCustomerModalRef"
      tabindex="-1"
      aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add a Customer</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
              id="kt_modal_add_customer_close"
              data-bs-dismiss="modal"
              class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <KTIcon icon-name="cross" icon-class="fs-1"/>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form>
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-8">
            <!--begin::Scroll-->
            <div
                class="scroll-y me-n3 pe-3"
                id="kt_modal_add_customer_scroll"
                data-kt-scroll="true"
                data-kt-scroll-activate="{default: false, lg: true}"
                data-kt-scroll-max-height="auto"
                data-kt-scroll-dependencies="#kt_modal_add_customer_header"
                data-kt-scroll-wrappers="#kt_modal_add_customer_scroll"
                data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row  d-flex">
                <div class="col-12 col-md-6">
                  <label class="required fs-6 fw-semobold mb-2">Name</label>
                  <el-form-item prop="name">
                    <el-input
                        v-model="Client.name"
                        type="text"
                        placeholder=""
                    />
                  </el-form-item>
                </div>
                <div class="col-12 col-md-6 ms-0 ms-md-2">
                  <label class="required fs-6 fw-semobold mb-2">Email</label>
                  <el-form-item prop="name">
                    <el-input
                        v-model="Client.email"
                        type="text"
                        placeholder=""
                    />
                  </el-form-item>
                </div>
              </div>
              <div class="fv-row d-flex">
                <div class="col-12 col-md-6">
                  <label class="required fs-6 fw-semobold mb-2">Email</label>
                  <el-form-item prop="name">
                    <el-input
                        v-model="Client.email"
                        type="text"
                        placeholder=""
                    />
                  </el-form-item>
                </div>
                <div class="col-12 col-md-6 ms-0 ms-md-2">
                  <label class="required fs-6 fw-semobold mb-2">Phone</label>
                  <el-form-item prop="name">
                    <el-input
                        v-model="Client.phone"
                        type="text"
                        placeholder=""
                    />
                  </el-form-item>
                </div>
              </div>
              <div class="fv-row d-flex">
                <div class="col-12 col-md-6">
                  <label class="required fs-6 fw-semobold mb-2">City</label>
                  <el-form-item prop="name">
                    <el-input
                        v-model="Client.city"
                        type="text"
                        placeholder=""
                    />
                  </el-form-item>
                </div>
                <div class="col-12 col-md-6 ms-0 ms-md-2">
                  <label class="required fs-6 fw-semobold mb-2">Country</label>
                  <el-form-item prop="name">
                    <el-input
                        v-model="Client.county"
                        type="text"
                        placeholder=""
                    />
                  </el-form-item>
                </div>
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Billing form-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
                type="reset"
                id="addClientModal"
                class="btn btn-light me-3"
                data-bs-dismiss="modal"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
                :data-kt-indicator="loading ? 'on' : null"
                class="btn btn-lg btn-primary"
                type="submit"
            >
              <span v-if="!loading" class="indicator-label">
                Submit
                <KTIcon icon-name="arrow-right" icon-class="fs-2 me-2 me-0"/>
              </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AddClientModal",
  data() {
    return {
      loading: false,
      Client: {
        id: 0,
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
      },
    };
  },
};
</script>

<style scoped></style>
