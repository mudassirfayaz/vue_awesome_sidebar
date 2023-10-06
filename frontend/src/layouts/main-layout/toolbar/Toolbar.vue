<template>
  <!--begin::Toolbar-->
  <div id="kt_app_toolbar" class="app-toolbar py-3 py-lg-6">
    <!--begin::Toolbar container-->
    <div
      id="kt_app_toolbar_container"
      class="app-container d-flex flex-stack"
      :class="{
        'container-fluid': toolbarWidthFluid,
        'container-xxl': !toolbarWidthFluid,
      }"
    >
      <KTPageTitle />
      <!--begin::Actions-->
<!--      <div class="d-flex align-items-center gap-2 gap-lg-3">
        &lt;!&ndash;begin::Secondary button&ndash;&gt;
        <a
          href="#"
          class="btn btn-sm fw-bold bg-body btn-color-gray-700 btn-active-color-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_create_app"
          >Rollover</a
        >
        &lt;!&ndash;end::Secondary button&ndash;&gt;
        &lt;!&ndash;begin::Primary button&ndash;&gt;
        <a
          href="#"
          class="btn btn-sm fw-bold btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_new_target"
          >Add Target</a
        >
        &lt;!&ndash;end::Primary button&ndash;&gt;
      </div>-->
      <!--end::Actions-->
    </div>
    <!--end::Toolbar container-->
  </div>
  <!--end::Toolbar-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { toolbarWidthFluid } from "@/core/helpers/config";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";

export default defineComponent({
  name: "layout-toolbar",
  components: {
    KTPageTitle,
  },
  setup() {
    return {
      toolbarWidthFluid,
    };
  },
});
</script>
