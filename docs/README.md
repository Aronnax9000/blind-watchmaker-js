<link rel="icon" href="favicon.ico?v=1.1"> 
<link rel="stylesheet" href="css/jquery/jquery-ui.css">
<link href='css/sm-core-css.css' rel='stylesheet' type='text/css' />
<link href='css/sm-watchmaker.css' rel='stylesheet' type='text/css' />
<link rel="stylesheet" type="text/css" href="css/watchmaker.css">
<script src="js/jquery/jquery-3.6.0.min.js"></script>
<script src="js/jquery/jquery-ui.min.js"></script>
<!-- SmartMenus jQuery plugin -->
<script src="js/smartmenus-1.1.0/jquery.smartmenus.min.js" type="text/javascript"></script>
<script src="js/watchmakerjs-1.0.0/watchmaker.js"></script>
<script src="js/watchmakerjs-1.0.0/biomorphs.js"></script>
<script src="js/watchmakerjs-1.0.0/monochrome.js"></script>
<script src="js/watchmakerjs-1.0.0/colour_biomorph.js"></script>
<script src="js/watchmakerjs-1.0.0/triay_shell.js"></script>
<script src="js/watchmakerjs-1.0.0/arthromorph.js"></script>
<!-- <script src="js/watchmakerjs-1.0.0/triay_biomorph.js"></script> -->
<!-- 
<script src="js/watchmakerjs-1.0.0/minimal.js"></script>
 -->
<script type="text/javascript">

<!-- from README.md -->
$(document).ready(
        function() {
            $('.blindWatchmaker').blindWatchmaker();
            $(".ui-closable-tab").click(
                    function() {
                        var tabContainerDiv = $(this).closest(".ui-tabs")
                                .attr("id");
                        var panelId = $(this).closest("li").remove().attr(
                                "aria-controls");
                        $("#" + panelId).remove();
                        $("#" + tabContainerDiv).tabs("refresh");
                        var tabCount = $("#" + tabContainerDiv).find(
                                ".ui-closable-tab").length;
                        if (tabCount < 1) {
                            $("#" + tabContainerDiv).hide();
                        }
                    });
        });
</script>

<div class="blindWatchmaker"></div>
