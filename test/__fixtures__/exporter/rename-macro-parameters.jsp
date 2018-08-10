<%@ page contentType="text/html; charset=UTF-8" session="false" %><%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%><%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%><%@ taglib prefix="entoj" uri="https://entoj.io/entoj"%><%@ taglib prefix="cm" uri="http://www.coremedia.com/2004/objectserver-1.0-2.0"%><%@ taglib prefix="bp" uri="http://www.coremedia.com/2012/blueprint"%><%--@elvariable id="settingsService" type="com.coremedia.blueprint.base.settings.SettingsService"--%><!-- macro e_image parameters -->
<c:set var="model" value="${ not empty model ? model : self }" /><c:set var="style" value="${ not empty style ? style : '' }" />
<!-- /macro e_image parameters -->
<!-- macro e_image body -->


    
    
    <c:set var="moduleClass" value="${ 'e-image' }" />

    
    <picture class="${ moduleClass } ${ style }">
        <c:set var="image" value="${ null }" />
        <c:if test="${ not empty settings }">
            <c:forEach var="indexAndSetting" items="${ settings }" varStatus="loop"><c:set var="index" value="${ indexAndSetting.key }" /><c:set var="setting" value="${ indexAndSetting.value }" />
                <c:if test="${ index != 'all' }">
                    <jsp:include page="/includes/helper/mediaQueries.jsp" /><c:set var="mediaQuery" value="${ __mediaQueries[setting.name] }" />
                    <c:set var="image" value="${ pageContext.request.contextPath.concat('/').concat(model) }" />
                    <source data-srcset="${ image }" media="${ mediaQuery }" />
                </c:if>
            </c:forEach>
            <c:forEach var="indexAndSetting" items="${ settings }" varStatus="loop"><c:set var="index" value="${ indexAndSetting.key }" /><c:set var="setting" value="${ indexAndSetting.value }" />
                <c:if test="${ index == 'all' }">
                    <c:set var="image" value="${ pageContext.request.contextPath.concat('/').concat(model) }" />
                    <source data-srcset="${ image }" />
                </c:if>
            </c:forEach>
        </c:if>
        <c:if test="${ empty image }">
            <c:set var="image" value="${ pageContext.request.contextPath.concat('/').concat(model) }" />
        </c:if>
        <img class="${ moduleClass }__img do-lazyload" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-srcset="${ image }" alt="${ model.alt }" />
    </picture>

<!-- /macro e_image body -->
