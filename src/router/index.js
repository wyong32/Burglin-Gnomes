import { createRouter, createWebHistory } from 'vue-router'
import BeginnerGuideView from '../views/BeginnerGuideView.vue'
import BestiaryDetailView from '../views/BestiaryDetailView.vue'
import CraftingView from '../views/CraftingView.vue'
import CraftingDetailView from '../views/CraftingDetailView.vue'
import EnemiesView from '../views/EnemiesView.vue'
import HomeView from '../views/HomeView.vue'
import ItemDetailView from '../views/ItemDetailView.vue'
import ItemsView from '../views/ItemsView.vue'
import AboutUsView from '../views/Legal/AboutUsView.vue'
import ContactUsView from '../views/Legal/ContactUsView.vue'
import CopyrightView from '../views/Legal/CopyrightView.vue'
import PrivacyPolicyView from '../views/Legal/PrivacyPolicyView.vue'
import TermsOfServiceView from '../views/Legal/TermsOfServiceView.vue'
import UpdatesView from '../views/UpdatesView.vue'
import WikiView from '../views/WikiView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        tdk: {
          title: "Burglin' Gnomes Guide — Tasks, Items, Crafting & Co-op Tips",
          description:
            "Player-made guide for Burglin' Gnomes: first High-Gnome tasks, safe routes, item finds, crafting recipes, enemy tips, and co-op fixes after the June 10 release.",
          keywords: "Burglin Gnomes guide, Burglin Gnomes wiki, co-op tips, beginner route",
        },
      },
    },
    {
      path: '/wiki/',
      name: 'wiki',
      component: WikiView,
      meta: {
        tdk: {
          title: "Burglin' Gnomes Wiki — Guides, Items & Enemies",
          description:
            "Browse every Burglin' Gnomes guide in one place: beginner routes, tasks, items, crafting, enemies, and what to recheck after patches.",
          keywords: "Burglin Gnomes wiki, guide index, tasks, items, crafting",
        },
      },
    },
    {
      path: '/beginner/',
      name: 'beginner',
      component: BeginnerGuideView,
      meta: {
        tdk: {
          title: "Beginner Guide — First Tasks & Safe Routes | Burglin' Gnomes",
          description:
            "New to Burglin' Gnomes? Read the task list first, use a safe entry like the vine window, clear bathroom and kitchen jobs, and fix co-op lag before chasing loot.",
          keywords: "Burglin Gnomes beginner guide, first tasks, co-op route",
        },
      },
    },
    { path: '/beginner-guide/', redirect: '/beginner/' },
    { path: '/tasks/', redirect: '/beginner/#first-tasks' },
    {
      path: '/items/',
      name: 'items',
      component: ItemsView,
      meta: {
        tdk: {
          title: "All Items — Materials, Weapons, Tools & Gear | Burglin' Gnomes",
          description:
            "Full Burglin' Gnomes item list from our runs: materials, weapons, tools, gear, task loot, where to find each one, and which recipes they feed.",
          keywords: "Burglin Gnomes items, materials, weapons, tools, gear",
        },
      },
    },
    { path: '/items/:slug/', name: 'item-detail', component: ItemDetailView },
    {
      path: '/crafting/',
      name: 'crafting',
      component: CraftingView,
      meta: {
        tdk: {
          title: "Crafting Recipes — Gear & Upgrades | Burglin' Gnomes",
          description:
            "Burglin' Gnomes crafting recipes we use on co-op runs: materials, gear effects, and which upgrades to craft first for safer routes.",
          keywords: "Burglin Gnomes crafting, recipes, gear upgrades",
        },
      },
    },
    { path: '/crafting/:slug/', name: 'crafting-detail', component: CraftingDetailView },
    {
      path: '/bestiary/',
      name: 'bestiary',
      component: EnemiesView,
      meta: {
        tdk: {
          title: "Bestiary — NPCs, Enemies & Hazards | Burglin' Gnomes",
          description:
            "Know what kills a run: humans, cats, pests, hostile gnomes, and household hazards in Burglin' Gnomes, with survival tips from our playtesting.",
          keywords: "Burglin Gnomes enemies, bestiary, cat, human homeowner",
        },
      },
    },
    { path: '/bestiary/:slug/', name: 'bestiary-detail', component: BestiaryDetailView },
    { path: '/enemies/', redirect: '/bestiary/' },
    {
      path: '/updates/',
      name: 'updates',
      component: UpdatesView,
      meta: {
        tdk: {
          title: "Updates & Patch Notes — Release Info | Burglin' Gnomes",
          description:
            "Burglin' Gnomes release facts, what changed in patches, and which routes, items, and enemies we recheck after updates.",
          keywords: "Burglin Gnomes updates, release date, patch notes",
        },
      },
    },
    { path: '/full-release/', redirect: '/updates/' },
    {
      path: '/legal/privacy-policy/',
      name: 'privacy-policy',
      component: PrivacyPolicyView,
      meta: {
        tdk: {
          title: "Privacy Policy | burglin-gnomes.org",
          description:
            "How burglin-gnomes.org handles visitor data, cookies, email contact, and basic server logs for this Burglin' Gnomes player guide.",
          keywords: 'burglin-gnomes.org privacy policy',
        },
      },
    },
    {
      path: '/legal/terms-of-service/',
      name: 'terms-of-service',
      component: TermsOfServiceView,
      meta: {
        tdk: {
          title: "Terms of Service | burglin-gnomes.org",
          description:
            "Terms for using burglin-gnomes.org, including guide accuracy, game attribution, site access, and how to contact us.",
          keywords: 'burglin-gnomes.org terms of service',
        },
      },
    },
    {
      path: '/legal/copyright/',
      name: 'copyright',
      component: CopyrightView,
      meta: {
        tdk: {
          title: "Copyright & Attribution | burglin-gnomes.org",
          description:
            "Copyright information for burglin-gnomes.org guide text, game asset attribution, and how to request takedowns or corrections.",
          keywords: 'burglin-gnomes.org copyright',
        },
      },
    },
    {
      path: '/legal/about-us/',
      name: 'about-us',
      component: AboutUsView,
      meta: {
        tdk: {
          title: "About Us — Who Writes This Guide | burglin-gnomes.org",
          description:
            "About the burglin-gnomes.org team: players who test Burglin' Gnomes routes, items, crafting, and co-op fixes for the community.",
          keywords: "Burglin Gnomes about us, player guide team",
        },
      },
    },
    {
      path: '/legal/contact-us/',
      name: 'contact-us',
      component: ContactUsView,
      meta: {
        tdk: {
          title: "Contact Us — Corrections & Feedback | burglin-gnomes.org",
          description:
            "Email the burglin-gnomes.org team about guide corrections, item updates, crafting notes, copyright questions, or site feedback.",
          keywords: 'burglin-gnomes.org contact',
        },
      },
    },
  ],
})

export default router
