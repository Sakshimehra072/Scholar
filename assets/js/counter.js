(function ($) {
  $.fn.countTo = function (options) {
    return this.each(function () {
      const $this = $(this);
      const settings = $.extend({}, $.fn.countTo.defaults, {
        from: $this.data("from"),
        to: $this.data("to"),
        speed: $this.data("speed"),
        refreshInterval: $this.data("refresh-interval"),
        decimals: $this.data("decimals")
      }, options);

      const loops = Math.ceil(settings.speed / settings.refreshInterval);
      const increment = (settings.to - settings.from) / loops;

      let value = settings.from;
      let loopCount = 0;

      const data = $this.data("countTo") || {};
      if (data.interval) clearInterval(data.interval);

      data.interval = setInterval(() => {
        value += increment;
        loopCount++;

        render(value);
        if (typeof settings.onUpdate === "function") {
          settings.onUpdate.call(this, value);
        }

        if (loopCount >= loops) {
          clearInterval(data.interval);
          $this.removeData("countTo");
          render(settings.to);

          if (typeof settings.onComplete === "function") {
            settings.onComplete.call(this, settings.to);
          }
        }
      }, settings.refreshInterval);

      $this.data("countTo", data);
      render(value);

      function render(val) {
        const formatted = settings.formatter.call(this, val, settings);
        $this.html(formatted);
      }
    });
  };

  $.fn.countTo.defaults = {
    from: 0,
    to: 0,
    speed: 1000,
    refreshInterval: 100,
    decimals: 0,
    formatter: (value, settings) => value.toFixed(settings.decimals),
    onUpdate: null,
    onComplete: null
  };
})(jQuery);

jQuery(function ($) {
  $(".count-number").data("countToOptions", {
    formatter: (value, options) =>
      value.toFixed(options.decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  });

  $(".timer").each(function () {
    const $this = $(this);
    const options = $.extend({}, $this.data("countToOptions") || {});
    $this.countTo(options);
  });
});
