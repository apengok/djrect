

from articles.api.views import ArticleViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', ArticleViewSet, basename='article')
urlpatterns = router.urls


# from django.conf.urls import url
# from django.urls import path

# from .views import (
#     ArticleListView,
#     ArticleDetailView,
#     ArticleCreateView,
#     ArticleUpdateView,
#     ArticleDeleteView
# )

app_name = 'articles-api'
# urlpatterns = [
#     url(r'^$',ArticleListView.as_view(),name='article-list'),
#     url(r'create/$',ArticleCreateView.as_view()),
#     url(r'^(?P<pk>[0-9]+)/$',ArticleDetailView.as_view()),
#     url(r'^(?P<pk>[0-9]+)/update/$',ArticleUpdateView.as_view()),
#     url(r'^(?P<pk>[0-9]+)/delete/$',ArticleDeleteView.as_view()),
# ]
