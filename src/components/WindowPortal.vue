<template>
    <div v-if="open">
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'window-portal',
    model: {
        prop: 'open',
        event: 'close'
    },
    props: {
        open: {
            type: Boolean,
            default: false,
        },
        url: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            windowRef: null,
        }
    },
    watch: {
        open(newOpen) {
            if (newOpen) {
                this.openPortal();
            } else {
                this.closePortal();
            }
        },
        url(newURL) {
            this.$props.url = newURL;
        }
    },
    methods: {
        openPortal() {
            if (this.$props.url !== '') {
                this.windowRef = window.open(this.$props.url, "", "width=800,height=600,left=200,top=200");
                this.windowRef.addEventListener('beforeunload', this.closePortal);
            }
        },
        closePortal() {
            console.log('close portal')
            if (this.windowRef) {
                this.windowRef.close();
                this.windowRef = null;
                this.$emit('closed');
            }
        }
    },
    mounted() {
        if (this.open) {
            this.openPortal();
        }
    },
    beforeDestroy() {
        if (this.windowRef) {
            this.closePortal();
        }
    },
    destroyed() {
        if (this.windowRef) {
            this.closePortal();
        }
    }
}
</script>