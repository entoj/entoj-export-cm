<%@ page contentType="text/html; charset=UTF-8" session="false" %><%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%><%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%><%@ taglib prefix="entoj" uri="https://entoj.io/entoj"%><%@ taglib prefix="cm" uri="http://www.coremedia.com/2004/objectserver-1.0-2.0"%><%@ taglib prefix="bp" uri="http://www.coremedia.com/2012/blueprint"%><%--@elvariable id="settingsService" type="com.coremedia.blueprint.base.settings.SettingsService"--%><!-- macro m_teaser_hero parameters -->
<c:set var="model" value="${ not empty model ? model : self }" /><!-- /macro m_teaser_hero parameters -->
<!-- macro m_teaser_hero body -->


    <jsp:include page="/base/includes/modules/m-teaser.jsp"><jsp:param name="type" value="${ 'hero' }" /><jsp:param name="model" value="${ model }" /><jsp:param name="classes" value="${ '' }" /></jsp:include>

<!-- /macro m_teaser_hero body -->
