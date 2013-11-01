describe('$drag', function() {
  var element, $drag, $drop, $dnd, $compile, $rootScope;
  beforeEach(module('ui.drop'));
  beforeEach(inject(function(_$drag_, _$drop_, _$dnd_, _$compile_, _$rootScope_) {
    $drag = _$drag_;
    $drop = _$drop_;
    $dnd = _$dnd_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    element = angular.element('<div style="height:100%; width: 100%;"></div>');
  }));
  afterEach(function() {
    if (element) {
      element = undefined;
    }
  });

  describe('draggable()', function() {
    it('should instantiate Draggable', function() {
      var instance = $drag.draggable(element);
      expect(instance.constructor.toString()).toContain("Draggable");
    });

    it('should return the already instantiated Draggable instance on subsequent calls', function() {
      var instance = $drag.draggable(element);
      expect($drag.draggable(element)).toEqual(instance);
    });

    it('should not instantiate Draggable if second parameter === false', function() {
      expect($drag.draggable(element, false)).toBeUndefined();
    });
  });

  it('should set $drag.current to the dragging element on mousedown', function() {
    var instance = $drag.draggable(element);
    element.triggerHandler('mousedown');
    expect($drag.current).toEqual(instance);
  });

  describe('DOM manipulation', function() {
    var parent, $body;
    beforeEach(inject(function(_$document_) {
      $body = _$document_.find('body');
    }));
    beforeEach(function() {
      parent = angular.element('<div style="width: 100px; height: 100px;"></div>');
      parent.append(element);
      $body.append(parent);
    });
    afterEach(function() {
      parent.remove();
      parent = undefined;
    });
    it('should keep a dragged elements size when keepSize is true', function() {
      var draggable = $drag.draggable(element, { keepSize: true }), style = element.prop('style');
      draggable.dragStart();
      expect(style.width).toEqual('100px');
      expect(style.height).toEqual('100px');
    });
  });
});