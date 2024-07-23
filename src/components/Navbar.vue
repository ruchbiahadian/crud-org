<template>
    <div class="nav_container">
        <div class="left">
            <b-button
                @click="setSidebar"
                size="is-small"
                type="is-secondary"
            >
                <b-icon type="is-success" icon="menu"></b-icon>
            </b-button>

        </div>
        <div class="right">
            <b-button
                @click="logout"
                label="Logout"
                icon-left="logout"
                size="is-small"
                type="is-secondary"
            />
        </div>
    </div>
</template>

<script>
export default{
    name: 'navbar',
    methods: {
        logout() {
            this.$store.dispatch("logout", this.$router);
        },
        routeToPageOrg(){
            this.$router.push({ name: "organization" });
        },
        routeToPageOrgAsset(){
            this.$router.push({ name: "organization_asset" });
        },
        setSidebar(){
            this.$store.dispatch("setSidebar")
        }
    },
}
</script>