/*
 * @Author: kermit.yu 
 * @Date: 2020-02-22 22:13:41 
 * @Last Modified by: kermit.yu
 * @Last Modified time: 2020-02-24 21:19:49
 */
REGIONS.unshift({
    id: '',
    region_name: "全部区域"
})
var ALL_HOSPITAL = {
    id: '',
    hospital_name: "全部医院"
}
HOSPITALS.unshift(ALL_HOSPITAL);
var area_index = _.findIndex(REGIONS, function (item) {return item.id == ppo.getUrlParam('distinct')});
console.log('area_index', area_index);
var hospital_index = -1;
var cur_region_id = area_index > 0 ? REGIONS[area_index].id : null;
var _hospitals = [];
if (area_index > 0) {
    _hospitals = _.filter(HOSPITALS, function(item){ return item.region_id == cur_region_id; });
    _hospitals.unshift(ALL_HOSPITAL);
    hospital_index = _.findIndex(_hospitals, function (item) {return item.id == ppo.getUrlParam('hospital')});
    console.log('_hospitals', _hospitals);
} else {
    hospital_index = _.findIndex(HOSPITALS, function (item) {return item.id == ppo.getUrlParam('hospital')});
}
console.log('hospital_index', hospital_index);

new Vue({
    el: '#app',
    data: {
        tabbarActive: 0,
        showAreas: false,
        area: '',
        areaIndex: area_index > 0 ? area_index : null,
        areas: _.pluck(REGIONS, 'region_name'),
        showHospitals: false,
        hospital: '',
        hospitalIndex: hospital_index > 0 ? hospital_index : null,
        hospitals: _.pluck(area_index > 0 ? _hospitals : HOSPITALS, 'hospital_name'),
        showStatus: false,
        statu: '',
        statuIndex: null,
        status: ['全部', '已发布', '已取消', '已接单'],
        keyword: ppo.getUrlParam('s') || '',
    },
    created: function() {
        this.area = this.areaIndex !== null ? this.areas[this.areaIndex] : '';
        this.hospital = this.hospitalIndex !== null ? this.hospitals[this.hospitalIndex] : '';
    },
    methods: {
        areaOnChange(picker, value, index) {
            // console.log(`当前值：${value}, 当前索引：${index}`);
            this.area = value;
            this.areaIndex = index;
            cur_region_id = REGIONS[this.areaIndex].id;
            if (cur_region_id !== '') {
                _hospitals = _.filter(HOSPITALS, function(item){ return item.region_id == cur_region_id; });
                _hospitals.unshift(ALL_HOSPITAL);
                this.hospitals = _.pluck(_hospitals, 'hospital_name');
            } else {
                this.hospitals = _.pluck(HOSPITALS, 'hospital_name');
            }
            this.hospital = '',
            this.hospitalIndex = null;
        },
        hospitalOnChange(picker, value, index) {
            // console.log(`当前值：${value}, 当前索引：${index}`);
            this.hospital = value;
            this.hospitalIndex = index;
        },
        statuOnChange(picker, value, index) {
            // console.log(`当前值：${value}, 当前索引：${index}`);
            this.statu = value;
            this.statuIndex = index;
        },
        onSearch: function () {
            // console.log({
            //     area: this.area,
            //     hospital: this.hospital,
            //     statu: this.statu,
            //     keyword: this.keyword,
            // });
            var distinct_id = !this.areaIndex ? '' : REGIONS[this.areaIndex].id;
            var hospital_id = !this.hospitalIndex ? '' : (cur_region_id && cur_region_id !== '' ? _hospitals[this.hospitalIndex].id : HOSPITALS[this.hospitalIndex].id);
            window.location.href = '/hotel_list?distinct=' + distinct_id + '&hospital=' + hospital_id + '&s=' + this.keyword;
        }
    }
});