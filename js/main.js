/**
 * 创建一个 Vue 应用实例
 * 该实例包含了 mixins 选项，用于合并多个组件选项
 * 同时定义了一些数据、生命周期钩子和方法
 */
const app = Vue.createApp({
    // 使用 mixins 选项合并多个组件选项
    mixins: Object.values(mixins),
    /**
     * 定义组件的数据
     * @returns {Object} 包含多个状态的对象
     */
    data() {
        return {
            // 页面加载状态，初始为 true 表示正在加载
            loading: true,
            // 菜单是否隐藏，初始为 false 表示不隐藏
            hiddenMenu: false,
            // 菜单项是否显示，初始为 false 表示不显示
            showMenuItems: false,
            // 菜单颜色状态，初始为 false 表示默认颜色
            menuColor: false,
            // 页面滚动的距离，初始为 0
            scrollTop: 0,
            // 渲染器数组，用于存储需要执行的渲染函数
            renderers: [],
        };
    },
    /**
     * 在实例初始化之后，数据观测和 event/watcher 事件配置之前被调用
     * 这里监听了 window 的 load 事件，当页面加载完成后，将 loading 状态设置为 false
     */
    created() {
        // 监听 window 的 load 事件
        window.addEventListener("load", () => {
            // 页面加载完成后，将 loading 状态设置为 false
            this.loading = false;
        });
    },
    /**
     * 在挂载完成后调用，此时模板已经编译完成并挂载到页面上
     * 这里监听了 window 的 scroll 事件，并调用 render 方法进行渲染
     */
    mounted() {
        // 监听 window 的 scroll 事件，绑定 handleScroll 方法，并设置为捕获阶段触发
        window.addEventListener("scroll", this.handleScroll, true);
        // 调用 render 方法进行渲染
        this.render();
    },
    methods: {
        render() {
            for (let i of this.renderers) i();
        },
        handleScroll() {
            let wrap = this.$refs.homePostsWrap;
            let newScrollTop = document.documentElement.scrollTop;
            if (this.scrollTop < newScrollTop) {
                this.hiddenMenu = true;
                this.showMenuItems = false;
            } else this.hiddenMenu = false;
            if (wrap) {
                if (newScrollTop <= window.innerHeight - 100) this.menuColor = true;
                else this.menuColor = false;
                if (newScrollTop <= 400) wrap.style.top = "-" + newScrollTop / 5 + "px";
                else wrap.style.top = "-80px";
            }
            this.scrollTop = newScrollTop;
        },
    },
});
app.mount("#layout");
