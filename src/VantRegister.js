import Vue from 'vue'
import directivesObj from './untils/directives'

// 引入Vant全局
import { NavBar, Form, Field, Button,Tabbar, TabbarItem, Icon,
  Tab, Tabs, Cell, List,PullRefresh, ActionSheet, Popup,Row, Col, Badge,
  Search, Divider,Tag, CellGroup, Image, Dialog, DatetimePicker, Loading, Lazyload} from 'vant'
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Cell)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(ActionSheet)
Vue.use(Popup)
Vue.use(Badge)
Vue.use(Row)
Vue.use(Col)
Vue.use(Search)
Vue.use(directivesObj)
Vue.use(Divider)
Vue.use(Tag)
Vue.use(CellGroup)
Vue.use(Image)
Vue.use(Dialog)
Vue.use(DatetimePicker)
Vue.use(Loading)
Vue.use(Lazyload)