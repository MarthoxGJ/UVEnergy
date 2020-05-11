from rest_framework import routers
from .api import BillListViewSet, PaidBillListViewSet, PendingBillListViewSet, GeneratePDFViewSet, GenerateBillsViewSet

router = routers.DefaultRouter()
router.register(r'billList', BillListViewSet, 'billList')
router.register(r'paidbillList', PaidBillListViewSet, 'paidbillList')
router.register(r'pendingbillList', PendingBillListViewSet, 'pendingbillList')
router.register(r'generatepdf', GeneratePDFViewSet, 'api-generatepdf')
router.register(r'createInvoices', GenerateBillsViewSet, 'createInvoices')

urlpatterns = router.urls