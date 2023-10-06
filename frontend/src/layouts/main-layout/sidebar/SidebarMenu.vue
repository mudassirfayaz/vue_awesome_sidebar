<template>
  <!--begin::sidebar menu-->
  <div class="app-sidebar-menu overflow-hidden flex-column-fluid">
    <!--begin::Menu wrapper-->
    <div
        id="kt_app_sidebar_menu_wrapper"
        class="app-sidebar-wrapper hover-scroll-overlay-y my-5"
        data-kt-scroll="true"
        data-kt-scroll-activate="true"
        data-kt-scroll-height="auto"
        data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
        data-kt-scroll-wrappers="#kt_app_sidebar_menu"
        data-kt-scroll-offset="5px"
        data-kt-scroll-save-state="true"
    >
      <!--begin::Menu-->
      <div
          id="#kt_app_sidebar_menu"
          class="menu menu-column menu-rounded menu-sub-indention px-3"
          data-kt-menu="true"
      >
        <template v-for="(item, i) in MainMenuConfig" :key="i">
          <div v-if="item.heading" class="menu-item pt-5">
            <div class="menu-content">
              <span class="menu-heading fw-bold text-uppercase fs-7">
                {{ translate(item.heading) }}
              </span>
            </div>
          </div>
          <template v-for="(menuItem, j) in item.pages" :key="j">
            <template v-if="menuItem.heading">
              <div class="menu-item">
                <router-link
                    v-if="menuItem.route"
                    class="menu-link"
                    active-class="active"
                    :to="menuItem.route"
                >
                  <span
                      v-if="menuItem.keenthemesIcon || menuItem.bootstrapIcon"
                      class="menu-icon"
                  >
                    <i
                        v-if="sidebarMenuIcons === 'bootstrap'"
                        :class="menuItem.bootstrapIcon"
                        class="bi fs-3"
                    ></i>
                    <KTIcon
                        v-else-if="sidebarMenuIcons === 'keenthemes'"
                        :icon-name="menuItem.keenthemesIcon"
                        icon-class="fs-2"
                    />
                  </span>
                  <span class="menu-title">{{
                      translate(menuItem.heading)
                    }}</span>
                </router-link>
              </div>
            </template>
            <div
                v-if="menuItem.sectionTitle && menuItem.route"
                :class="{ show: hasActiveChildren(menuItem.route) }"
                class="menu-item menu-accordion"
                data-kt-menu-sub="accordion"
                data-kt-menu-trigger="click"
            >
              <span class="menu-link">
                <span
                    v-if="menuItem.keenthemesIcon || menuItem.bootstrapIcon"
                    class="menu-icon"
                >
                  <i
                      v-if="sidebarMenuIcons === 'bootstrap'"
                      :class="menuItem.bootstrapIcon"
                      class="bi fs-3"
                  ></i>
                  <KTIcon
                      v-else-if="sidebarMenuIcons === 'keenthemes'"
                      :icon-name="menuItem.keenthemesIcon"
                      icon-class="fs-2"
                  />
                </span>
                <span class="menu-title">{{
                    translate(menuItem.sectionTitle)
                  }}</span>
                <span class="menu-arrow"></span>
              </span>
              <div
                  :class="{ show: hasActiveChildren(menuItem.route) }"
                  class="menu-sub menu-sub-accordion"
              >
                <template v-for="(item2, k) in menuItem.sub" :key="k">
                  <div v-if="item2.heading" class="menu-item">
                    <router-link
                        v-if="item2.route"
                        class="menu-link"
                        active-class="active"
                        :to="item2.route"
                    >
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">{{
                          translate(item2.heading)
                        }}</span>
                    </router-link>
                  </div>
                  <div
                      v-if="item2.sectionTitle && item2.route"
                      :class="{ show: hasActiveChildren(item2.route) }"
                      class="menu-item menu-accordion"
                      data-kt-menu-sub="accordion"
                      data-kt-menu-trigger="click"
                  >
                    <span class="menu-link">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">{{
                          translate(item2.sectionTitle)
                        }}</span>
                      <span class="menu-arrow"></span>
                    </span>
                    <div
                        :class="{ show: hasActiveChildren(item2.route) }"
                        class="menu-sub menu-sub-accordion"
                    >
                      <template v-for="(item3, k) in item2.sub" :key="k">
                        <div v-if="item3.heading" class="menu-item">
                          <router-link
                              v-if="item3.route"
                              class="menu-link"
                              active-class="active"
                              :to="item3.route"
                          >
                            <span class="menu-bullet">
                              <span class="bullet bullet-dot"></span>
                            </span>
                            <span class="menu-title">{{
                                translate(item3.heading)
                              }}</span>
                          </router-link>
                        </div>
                      </template>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </template>
        <!--begin:Menu item-->
        <div class="menu-item">
          <!--begin:Menu link-->
          <router-link
              to="/providers"
              class="menu-link"
              active-class="active router-link-exact-active"
          >
            <span class="menu-icon">
              <i
                  v-if="sidebarMenuIcons === 'bootstrap'"
                  class="bi bi-person fs-3"
              ></i>
              <KTIcon
                  v-else-if="sidebarMenuIcons === 'keenthemes'"
                  icon-name="user-tick"
                  icon-class="fs-2"
              />
            </span>
            <span class="menu-title">Providers</span>
          </router-link>
          <!--end:Menu link-->
        </div>
        <div class="menu-item">
          <!--begin:Menu link-->
          <router-link
              to="/clients"
              class="menu-link"
              active-class="active router-link-exact-active"
          >
            <span class="menu-icon">
              <i
                  v-if="sidebarMenuIcons === 'bootstrap'"
                  class="bi bi-person fs-3"
              ></i>
              <KTIcon
                  v-else-if="sidebarMenuIcons === 'keenthemes'"
                  icon-name="user"
                  icon-class="fs-2"
              />
            </span>
            <span class="menu-title">Clients</span>
          </router-link>
          <!--end:Menu link-->
        </div>
        <div class="menu-item">
          <!--begin:Menu link-->
          <router-link
              to="compliance"
              class="menu-link"
              active-class="active router-link-exact-active"
          >
            <span class="menu-icon">
              <i
                  v-if="sidebarMenuIcons === 'bootstrap'"
                  class="bi bi-person fs-3"
              ></i>
              <KTIcon
                  v-else-if="sidebarMenuIcons === 'keenthemes'"
                  icon-name="some-files"
                  icon-class="fs-2"
              />
            </span>
            <span class="menu-title">Compliance</span>
          </router-link>
          <!--end:Menu link-->
        </div>
        <div class="menu-item">
          <!--begin:Menu link-->
          <router-link
              to="property"
              class="menu-link"
              active-class="active router-link-exact-active"
          >
            <span class="menu-icon">
              <i
                  v-if="sidebarMenuIcons === 'bootstrap'"
                  class="bi bi-person fs-3"
              ></i>
              <KTIcon
                  v-else-if="sidebarMenuIcons === 'keenthemes'"
                  icon-name="home-1"
                  icon-class="fs-2"
              />
            </span>
            <span class="menu-title">Properties</span>
          </router-link>
          <!--end:Menu link-->
        </div>
<!--        <div class="accordion accordion-flush menu-item" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header menu-item border-0" active-class="active router-link-exact-active">
              <router-link
                  to=""
                  class="accordion-header border-0 menu-link bg-transparent accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
              >
                <span class="menu-icon border-0">
                  <i
                      v-if="sidebarMenuIcons === 'bootstrap'"
                      class="bi bi-person fs-3"
                  ></i>
                  <KTIcon
                      v-else-if="sidebarMenuIcons === 'keenthemes'"
                      icon-name="home-1"
                      icon-class="fs-2"
                  />
                </span>
                <span class="menu-title">Properties</span>
              </router-link>
            </h2>
            <div
                id="flush-collapseOne"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
            >
              <div
                  class="collapse menu-sub menu-sub-accordion"
                  id="collapseExample"
              >
                <div class="menu-item">
                  <router-link
                      class="menu-link"
                      active-class="active"
                      to="property"
                  >
                <span class="menu-bullet">
                  <span class="bullet bullet-dot"></span>
                </span>
                    <span class="menu-title">Property</span>
                  </router-link>
                </div>
              </div>
              <div
                  class="collapse menu-sub menu-sub-accordion"
                  id="collapseExample"
              >
                <div class="menu-item">
                  <router-link
                      class="menu-link"
                      active-class="active"
                      to="rooms"
                  >
                <span class="menu-bullet">
                  <span class="bullet bullet-dot"></span>
                </span>
                    <span class="menu-title">Rooms</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>-->

        <div class="menu-item">
          <!--begin:Menu link-->
          <router-link
              to="users"
              class="menu-link"
              active-class="active router-link-exact-active"
          >
            <span class="menu-icon">
              <i
                  v-if="sidebarMenuIcons === 'bootstrap'"
                  class="bi bi-person fs-3"
              ></i>
              <KTIcon
                  v-else-if="sidebarMenuIcons === 'keenthemes'"
                  icon-name="people"
                  icon-class="fs-2"
              />
            </span>
            <span class="menu-title">Users</span>
          </router-link>
          <!--end:Menu link-->
        </div>
        <!--end:Menu item-->
      </div>
      <!--end::Menu-->
    </div>
    <!--end::Menu wrapper-->
  </div>
  <!--end::sidebar menu-->
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import MainMenuConfig from "@/core/config/MainMenuConfig";
import {sidebarMenuIcons} from "@/core/helpers/config";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "sidebar-menu",
  components: {},
  setup() {
    const {t, te} = useI18n();
    const route = useRoute();
    const scrollElRef = ref<null | HTMLElement>(null);

    onMounted(() => {
      if (scrollElRef.value) {
        scrollElRef.value.scrollTop = 0;
      }
    });

    const translate = (text: string) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    const hasActiveChildren = (match: string) => {
      return route.path.indexOf(match) !== -1;
    };

    return {
      hasActiveChildren,
      MainMenuConfig,
      sidebarMenuIcons,
      translate,
      getAssetPath,
    };
  },
});
</script>
<style scoped>
.accordion-button:not(.collapsed)::after {
  color: #ff0000 !important; /* Replace with your desired color */
}
</style>