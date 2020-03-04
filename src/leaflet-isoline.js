var IsolineOverlay = L.Layer.extend({

    /**
     * 
     * @param {style:Object(样式), nums:Int(个数), breaks:Array(等值级别), icons:Array(每个等级的图标)} config 
     */
    initialize: function (config) {
        this.myGroup = [];
        this.isoline_layer = [];
        this.cfg = config;
        this.data = [];
        if (this.cfg.nums != this.cfg.breaks.length ) {
            throw Error('The length of icons is not equal to the numbers of your grade')
        }
    },

    // removeData: function () {
    //     // 将数据清空
    //     this.data = []
    //     // 将标记全部移除
    //     for (marker_temp in this.markers) {
    //         map.removeLayer(marker_temp);
    //     }
    // },

    onAdd: function (map) {
        this._map = map;
        // 一开始画数据
        console.log('hhh')
        this._draw(this.data);
    },

    addTo: function (map) {
        map.addLayer(this);
        return this;
    },

    onRemove: function (map) {
        // 将数据清空
        this.isoline_layer = [];
        this.myGroup.clearLayers();
    },

    _draw: function (pointGrid) {
        //等值线的级数
        var breaks = this.cfg.breaks;
        //console.log(pointGrid)
        var lines = turf.isolines(pointGrid, breaks, { zProperty: 'temperature' });

        //设置颜色
        var myStyle = this.cfg.style;
        var icons = this.cfg.icons;

        // 进行平滑处理
        var _lFeatures = lines.features;
        var marks = [];
        for (var i = 0; i < _lFeatures.length; i++) {
            var _coords = _lFeatures[i].geometry.coordinates;
            var _lCoords = [];
            var linemarks = [];
            for (var j = 0; j < _coords.length; j++) {
                var _coord = _coords[j];
                var line = turf.lineString(_coord); // 点成线
                var curved = turf.bezierSpline(line); // 直线平滑成曲线
                coordinate = curved.geometry.coordinates[curved.geometry.coordinates.length / 2];
                temp = [];
                temp.push(coordinate[1]);
                temp.push(coordinate[0]);
                var isoline_marker = L.marker(temp, { icon: icons[i] }).addTo(map)
                this.isoline_layer.push(isoline_marker);
                linemarks.push(curved.geometry.coordinates[0]);
                _lCoords.push(curved.geometry.coordinates);
            }
            marks.push(linemarks);
            _lFeatures[i].geometry.coordinates = _lCoords;
        }

        //geojson数据读取
        var isoline_lines = L.geoJSON(lines, {
            style: myStyle
        });
        isoline_lines.addTo(map)
        this.isoline_layer.push(isoline_lines);
        this.myGroup = L.layerGroup(this.isoline_layer);
        this._map.addLayer(this.myGroup);
    },

    /**
     * 设置数据
     * @param {数据} data 
     */
    setData: function (data) {
        this.data = data;
    },

    /**
     * 添加数据
     * @param {数据} data 
     */
    addData: function (data) {
        this.data.push(data);
        this._draw(data);
    }
});