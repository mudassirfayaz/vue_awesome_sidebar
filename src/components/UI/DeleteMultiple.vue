<template>
  <div
    id="deleteMultipleModal"
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
            <h3 class="fw-bold">Delete {{ title }}</h3>
            <el-button text data-bs-dismiss="modal">
              <KTIcon icon-name="abstract-11" icon-class="fs-5 m-0" />
            </el-button>
          </div>
        </div>
        <div class="modal-body p-5">
          <span
            >Are you sure? you want to delete selected
            <strong class="text-danger"
              >{{ no.length }} {{ title }}</strong
            ></span
          >
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
            class="btn btn-sm btn-danger"
            data-bs-dismiss="modal"
            @click="deleteMultiple"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "../../core/services/ApiService";
import { ShowMessage } from "./ShowMessage";

export default {
  name: "DeleteMultiple",
  props: {
    title: {
      type: String,
      required: true,
    },
    no: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    entityId: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      ShowDialog: true,
    };
  },
  methods: {
    deleteMultiple: async function () {
      for (const element of this.no) {
        try {
          let response = await ApiService.delete(
            this.slug + "/delete?" + this.slug + "Id=" + element
          );
          if (response.status === 200) {
            ShowMessage("success", this.title + " Deleted Successfully");
            this.$emit("deleteClientSuccess");
          }
        } catch (e) {
          console.log(e);
          ShowMessage("error", "Something went wrong!");
        }
      }
    },
  },
};
</script>

<style scoped></style>
