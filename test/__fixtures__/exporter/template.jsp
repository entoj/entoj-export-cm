<%@ page contentType="text/html; charset=UTF-8" session="false" %><%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%><%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%><%@ taglib prefix="entoj" uri="https://entoj.io/entoj"%><%@ taglib prefix="cm" uri="http://www.coremedia.com/2004/objectserver-1.0-2.0"%><%@ taglib prefix="bp" uri="http://www.coremedia.com/2012/blueprint"%><%--@elvariable id="settingsService" type="com.coremedia.blueprint.base.settings.SettingsService"--%><!doctype html>
<html class="no-js" lang="de">
    <head>
        <meta charset="utf-8" />
        <title><!-- Block title start -->
<c:if test="${ not empty self.placementMap.title.items }"><cm:include self="${ self.placementMap.title }" view="title"/></c:if><!-- Block title end -->
</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="TK Relaunch" />
        <jsp:include page="/includes/global/global-nojs.jsp"></jsp:include>
        <jsp:include page="/includes/global/global-css.jsp"></jsp:include>
    </head>
    <body class="t-bare <!-- Block bodyClass start -->
<c:if test="${ not empty self.placementMap.bodyClass.items }"><cm:include self="${ self.placementMap.bodyClass }" view="bodyClass"/></c:if><!-- Block bodyClass end -->
">
        <!-- Block header start -->
<c:if test="${ not empty self.placementMap.header.items }"><cm:include self="${ self.placementMap.header }" view="header"/></c:if><!-- Block header end -->

        <div class="t-bare__viewport">
            <!-- Block content start -->
<c:if test="${ not empty self.placementMap.content.items }"><cm:include self="${ self.placementMap.content }" view="content"/></c:if><!-- Block content end -->

        </div>
        <!-- Block footer start -->
<c:if test="${ not empty self.placementMap.footer.items }"><cm:include self="${ self.placementMap.footer }" view="footer"/></c:if><!-- Block footer end -->

        <jsp:include page="/includes/global/global-js.jsp"></jsp:include>
    </body>
</html>
