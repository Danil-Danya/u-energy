<template>
    <div class="settings__all">
        <dragAndDrop />
        <settingsData />
    </div>
</template>

<script>
import dragAndDrop from "@/components/pages/settings_all/DragAndDrop.vue";
import settingsData from "@/components/pages/settings_all/SettingsData.vue";

export default {
    components: {
        dragAndDrop,
        settingsData
    }
}
</script>