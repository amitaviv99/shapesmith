var SS = SS || {};

SS.Rectangle2DCreator = SS.Creator.extend({

    initialize: function(attributes) {
        SS.Creator.prototype.initialize.call(this, attributes);

        this.node.parameters.u = 10;
        this.node.parameters.v = 10;

        this.views = this.views.concat([
            new SS.Rectangle2DPreview({model: this}),
            new SS.DraggableUVCorner({model: this}),
        ]);
        this.trigger('change', this);
    },

    mouseDownOnUV: function(corner) {
        this.activateCorner(corner);
    },

    getBoundingBox: function() {
        var origin = this.node.origin;
        var u = this.node.parameters.u;
        var v = this.node.parameters.v;
        return {min: new THREE.Vector3(origin.x, origin.y, origin.z),
                max: new THREE.Vector3(origin.x + u, origin.y + v, origin.z)};
    },


});

SS.Rectangle2DPreview = SS.PreviewWithOrigin.extend({

    initialize: function() {
        SS.PreviewWithOrigin.prototype.initialize.call(this);
        this.render();
    },
    
    render: function() {
        this.clear();
        SS.PreviewWithOrigin.prototype.render.call(this);
        
        var origin = this.model.node.origin;
        var u = this.model.node.parameters.u;
        var v = this.model.node.parameters.v;
        var w = this.model.node.parameters.w;

        var materials = [ SS.constructors.faceMaterial, SS.constructors.wireframeMaterial ];

        if (u && v) {
            var planeGeom = new THREE.PlaneGeometry(u, v);
            var plane = THREE.SceneUtils.createMultiMaterialObject(planeGeom, materials);
            plane.position = new THREE.Vector3(origin.x + u/2, origin.y + v/2, origin.z);
            
	    this.sceneObject.add(plane);
        }


        this.postRender();
    },

});
