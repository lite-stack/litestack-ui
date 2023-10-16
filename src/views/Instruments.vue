<template>
  <v-container>
    <v-table
        class="elevation-1"
        :key="servers">
      <template v-slot:top>
        <v-toolbar>
          <v-toolbar-title class="text-h4 text--primary text-primary">
            Сервери
            <v-chip color="primary">{{ servers.length }} / {{ serverLimit }}</v-chip>
          </v-toolbar-title>

          <v-divider
              class="mx-4"
              inset
              vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <thead>
      <tr>
        <th class="text-left">
          Назва
        </th>
        <th class="text-left">
          Статус
        </th>
        <th class="text-left">
          HADOOP
        </th>
        <th class="text-left">
          Python
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="server in servers"
          :key="server.name"
      >
        <td>
          <router-link :to="{ name: 'Server instanse', params: {id: server.id} }"
                       class="text-decoration-none">
            {{ server.name }}
          </router-link>
        </td>
        <td :class="font-weight-medium">
          <v-chip :color="server.getStatusColor()">
            {{ server.getStatus() }}
          </v-chip>
        </td>
        <td>
          <v-row>
            <v-btn
                v-if="server.tags && !server.tags.find(elem => elem === 'pytorch')"
                color="primary"
                class="mb-2"
                v-bind="props"
                variant="tonal"
                @click="enableTorch(server.id)"
                :loading="loading"
            >
              Встановити
            </v-btn>
            <v-btn
                v-else
                color="primary"
                class="mb-2"
                v-bind="props"
                variant="tonal"
                @click="disableTorch(server.id)"
                :loading="loading"
            >
              Видалити
            </v-btn>
          </v-row>
        </td>
        <td>
          <v-row>
          <v-btn
                v-if="server.tags && !server.tags.find(elem => elem === 'tensorflow')"
                color="primary"
                class="mb-2"
                v-bind="props"
                variant="tonal"
                @click="enableTensorflow(server.id)"
                :loading="loading"
            >
              Встановити
            </v-btn>
            <v-btn
                v-else
                color="primary"
                class="mb-2"
                v-bind="props"
                variant="tonal"
                @click="disableTensorflow(server.id)"
                :loading="loading"
            >
              Видалити
            </v-btn>
          </v-row>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import {useAlertStore} from '@/stores/alert.store.js';

import ServerService from "@/services/server"
import ServerDeleteDialog from "@/views/server/ServerDeleteDialog.vue"
import ServerUpdateDialog from "@/views/server/ServerUpdateDialog.vue"

export default {
  name: 'Instruments',
  components: {ServerDeleteDialog, ServerUpdateDialog},
  async created() {
    await this.fetchServerConfigs()
    await this.fetchServersLimit()
    await this.fetchAppropriateServers()
  },
  data() {
    return {
      configs: [],
      servers: [],
      serverLimit: 0
    }
  },
  methods: {
    async fetchServerConfigs() {
      try {
        this.configs = await ServerService.getConfigs()
      } catch (error) {
        useAlertStore().error(error);
      }
    },
    async fetchAppropriateServers() {
      try {
        this.servers = await ServerService.getConfigurableServers()
      } catch (error) {
        useAlertStore().error(error);
      }
    },
    async fetchServersLimit() {
      try {
        this.serverLimit = await ServerService.getServersLimit()
      } catch (error) {
        useAlertStore().error(error);
      }
    },
    async enableTorch(id) {
      try {
        await ServerService.enableTorch(id);
      } catch (error) {
        useAlertStore().error(error);
      } finally {
        this.close();
        this.loading = false
      }
      await this.fetchServerConfigs()
    },
    async disableHadoop(id) {

      await this.fetchServerConfigs()
    },
    async enableTensorflow(id) {

      await this.fetchServerConfigs()
    },
    async disable_tensorflow(id) {

      await this.fetchServerConfigs()
    },
    get_config_name() {
      let configNames = []

      for (let config of this.configs) {
        configNames.push(config.name)
      }

      return configNames
    }
  }
}
</script>

<style scoped>

</style>