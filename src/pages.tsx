import { Search, X } from 'lucide-react'
import { useState } from 'react'

type RequestStatus = '待审核' | '已同意' | '已拒绝'
type RequestType = '退货' | '换货'

interface OrderProduct {
  name: string
  sku: string
  variant: string
  quantity: number
  unitPrice: string
  compareAtPrice?: string
  totalPrice: string
}

interface AfterSalesRequest {
  id: string
  appliedAt: string
  orderNo: string
  type: RequestType
  status: RequestStatus
  reasonPath: string[]
  note: string
  photos: string[]
  customer: string
  email: string
  amount: string
  orderDate: string
  shippingAddress: string
  channel: string
  fulfillmentStatus: string
  fulfillmentCount: number
  warehouse: string
  trackingNo: string
  returnLogistics: {
    carrier: string
    trackingNo: string
    shippedAt: string
  }
  sender: {
    name: string
    phone: string
    address: string
  }
  originalProducts: OrderProduct[]
  returnProducts: OrderProduct[]
  replacementProducts?: OrderProduct[]
}

const requests: AfterSalesRequest[] = [
  {
    id: 'RMA-20260609-014',
    appliedAt: '2026-06-09 14:26',
    orderNo: '#DTC-83921',
    type: '退货',
    status: '待审核',
    reasonPath: ['商品问题', '尺码不合适', '偏大'],
    note: '客户反馈衣服偏大，希望退货退款。',
    photos: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=240&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=240&q=80',
    ],
    customer: 'Emily Carter',
    email: 'emily.carter@example.com',
    amount: '$129.99',
    orderDate: '2026-06-08',
    shippingAddress: '123 Main Street, New York, NY 10001',
    channel: 'Shopify',
    fulfillmentStatus: 'Confirmed',
    fulfillmentCount: 3,
    warehouse: 'US Warehouse',
    trackingNo: '9235990407313600576401',
    returnLogistics: {
      carrier: 'USPS',
      trackingNo: '9235990407313600576401',
      shippedAt: '2026-06-09 15:10',
    },
    sender: {
      name: 'Emily Carter',
      phone: '+1 555-0124',
      address: '123 Main Street, New York, NY 10001',
    },
    originalProducts: [
      {
        name: 'Waterproof Hunting Jacket',
        sku: 'SKU-HJ-01',
        variant: 'Size L / Camo',
        quantity: 1,
        unitPrice: '$129.99',
        totalPrice: '$129.99',
      },
      {
        name: 'Merino Base Layer',
        sku: 'SKU-MB-04',
        variant: 'Black / L',
        quantity: 1,
        unitPrice: '$48.00',
        compareAtPrice: '$59.99',
        totalPrice: '$48.00',
      },
      {
        name: 'Waterproof Cap',
        sku: 'SKU-WC-02',
        variant: 'Camo',
        quantity: 1,
        unitPrice: '$24.99',
        totalPrice: '$24.99',
      },
    ],
    returnProducts: [
      {
        name: 'Waterproof Hunting Jacket',
        sku: 'SKU-HJ-01',
        variant: 'Size L / Camo',
        quantity: 1,
        unitPrice: '$129.99',
        totalPrice: '$129.99',
      },
      {
        name: 'Merino Base Layer',
        sku: 'SKU-MB-04',
        variant: 'Black / L',
        quantity: 1,
        unitPrice: '$48.00',
        compareAtPrice: '$59.99',
        totalPrice: '$48.00',
      },
    ],
  },
  {
    id: 'RMA-20260609-013',
    appliedAt: '2026-06-09 13:48',
    orderNo: '#DTC-83918',
    type: '换货',
    status: '已同意',
    reasonPath: ['商品问题', '尺码不合适', '偏小'],
    note: '客户希望更换为大一码。',
    photos: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=240&q=80',
    ],
    customer: 'Michael Lee',
    email: 'michael.lee@example.com',
    amount: '$89.99',
    orderDate: '2026-06-07',
    shippingAddress: '47 Lake View Road, Seattle, WA 98101',
    channel: 'Amazon',
    fulfillmentStatus: 'Fulfilled',
    fulfillmentCount: 1,
    warehouse: 'US Warehouse',
    trackingNo: '9235990407313600576418',
    returnLogistics: {
      carrier: 'FedEx',
      trackingNo: '6129091139482012',
      shippedAt: '2026-06-09 14:05',
    },
    sender: {
      name: 'Michael Lee',
      phone: '+1 555-0188',
      address: '47 Lake View Road, Seattle, WA 98101',
    },
    originalProducts: [
      {
        name: 'Insulated Hunting Boots',
        sku: 'SKU-WB-22',
        variant: 'Size 10 / Brown',
        quantity: 1,
        unitPrice: '$89.99',
        totalPrice: '$89.99',
      },
    ],
    returnProducts: [
      {
        name: 'Insulated Hunting Boots',
        sku: 'SKU-WB-22',
        variant: 'Size 10 / Brown',
        quantity: 1,
        unitPrice: '$89.99',
        totalPrice: '$89.99',
      },
    ],
    replacementProducts: [
      {
        name: 'Insulated Hunting Boots',
        sku: 'SKU-WB-22',
        variant: 'Size 11 / Brown',
        quantity: 1,
        unitPrice: '$89.99',
        totalPrice: '$89.99',
      },
    ],
  },
  {
    id: 'RMA-20260609-012',
    appliedAt: '2026-06-09 11:15',
    orderNo: '#DTC-83902',
    type: '退货',
    status: '已拒绝',
    reasonPath: ['政策限制', '超过退货期限'],
    note: '申请时间已超出退货政策窗口。',
    photos: [],
    customer: 'Olivia Smith',
    email: 'olivia.smith@example.com',
    amount: '$36.50',
    orderDate: '2026-06-06',
    shippingAddress: '900 Market Street, San Francisco, CA 94102',
    channel: 'Shopify',
    fulfillmentStatus: 'Fulfilled',
    fulfillmentCount: 1,
    warehouse: 'US Warehouse',
    trackingNo: '9235990407313600576402',
    returnLogistics: {
      carrier: 'UPS',
      trackingNo: '1Z9283W90372918233',
      shippedAt: '2026-06-09 12:22',
    },
    sender: {
      name: 'Olivia Smith',
      phone: '+1 555-0167',
      address: '900 Market Street, San Francisco, CA 94102',
    },
    originalProducts: [
      {
        name: 'Insulated Gloves',
        sku: 'SKU-IG-08',
        variant: 'Size M / Black',
        quantity: 1,
        unitPrice: '$36.50',
        totalPrice: '$36.50',
      },
    ],
    returnProducts: [
      {
        name: 'Insulated Gloves',
        sku: 'SKU-IG-08',
        variant: 'Size M / Black',
        quantity: 1,
        unitPrice: '$36.50',
        totalPrice: '$36.50',
      },
    ],
  },
  {
    id: 'RMA-20260608-088',
    appliedAt: '2026-06-08 17:32',
    orderNo: '#DTC-83877',
    type: '换货',
    status: '待审核',
    reasonPath: ['商品问题', '颜色不符合预期', '与页面展示不一致'],
    note: '客户希望更换为黑色款。',
    photos: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=240&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=240&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=240&q=80',
    ],
    customer: 'Noah Brown',
    email: 'noah.brown@example.com',
    amount: '$0.00',
    orderDate: '2026-06-05',
    shippingAddress: '260 Oak Avenue, Austin, TX 78701',
    channel: 'TikTok Shop',
    fulfillmentStatus: 'Fulfilled',
    fulfillmentCount: 1,
    warehouse: 'US Warehouse',
    trackingNo: '9235990407313600576477',
    returnLogistics: {
      carrier: 'USPS',
      trackingNo: '9235990407313600576477',
      shippedAt: '2026-06-08 18:06',
    },
    sender: {
      name: 'Noah Brown',
      phone: '+1 555-0199',
      address: '260 Oak Avenue, Austin, TX 78701',
    },
    originalProducts: [
      {
        name: 'Trail Backpack 35L',
        sku: 'SKU-TB-35',
        variant: '35L / Forest Green',
        quantity: 1,
        unitPrice: '$0.00',
        totalPrice: '$0.00',
      },
    ],
    returnProducts: [
      {
        name: 'Trail Backpack 35L',
        sku: 'SKU-TB-35',
        variant: '35L / Forest Green',
        quantity: 1,
        unitPrice: '$0.00',
        totalPrice: '$0.00',
      },
    ],
    replacementProducts: [
      {
        name: 'Trail Backpack 35L',
        sku: 'SKU-TB-35',
        variant: '35L / Black',
        quantity: 1,
        unitPrice: '$0.00',
        totalPrice: '$0.00',
      },
    ],
  },
  {
    id: 'RMA-20260608-076',
    appliedAt: '2026-06-08 09:41',
    orderNo: '#DTC-83845',
    type: '退货',
    status: '已同意',
    reasonPath: ['商品问题', '质量问题', '拉链瑕疵'],
    note: '客户上传图片显示拉链位置存在瑕疵。',
    photos: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=240&q=80',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=240&q=80',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=240&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=240&q=80',
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=240&q=80',
    ],
    customer: 'Sophia Wilson',
    email: 'sophia.wilson@example.com',
    amount: '$219.00',
    orderDate: '2026-06-04',
    shippingAddress: '18 Pine Hill Drive, Denver, CO 80202',
    channel: 'Shopify',
    fulfillmentStatus: 'Fulfilled',
    fulfillmentCount: 1,
    warehouse: 'US Warehouse',
    trackingNo: '9235990407313600576445',
    returnLogistics: {
      carrier: 'DHL',
      trackingNo: 'JD014600009827344231',
      shippedAt: '2026-06-08 10:18',
    },
    sender: {
      name: 'Sophia Wilson',
      phone: '+1 555-0102',
      address: '18 Pine Hill Drive, Denver, CO 80202',
    },
    originalProducts: [
      {
        name: 'Thermal Hunting Jacket',
        sku: 'SKU-HJ-02',
        variant: 'Size XL / Moss',
        quantity: 1,
        unitPrice: '$219.00',
        totalPrice: '$219.00',
      },
    ],
    returnProducts: [
      {
        name: 'Thermal Hunting Jacket',
        sku: 'SKU-HJ-02',
        variant: 'Size XL / Moss',
        quantity: 1,
        unitPrice: '$219.00',
        totalPrice: '$219.00',
      },
    ],
  },
]

const statusClassNames: Record<RequestStatus, string> = {
  待审核: 'pending',
  已同意: 'approved',
  已拒绝: 'rejected',
}

const typeClassNames: Record<RequestType, string> = {
  退货: 'return',
  换货: 'exchange',
}

function DetailField({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="detail-field">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function TypeField({ type }: { type: RequestType }) {
  return (
    <div className="detail-field">
      <span>申请类型</span>
      <strong>
        <i className={`type-pill ${typeClassNames[type]}`}>{type}</i>
      </strong>
    </div>
  )
}

function ReasonBreadcrumb({
  items,
  label = '退换货原因',
}: {
  items: string[]
  label?: string
}) {
  return (
    <div className="detail-field reason-field">
      <span>{label}</span>
      <div className="reason-breadcrumb">
        {items.map((item, index) => (
          <div className="reason-crumb" key={`${item}-${index}`}>
            <strong>{item}</strong>
            {index < items.length - 1 && <b>/</b>}
          </div>
        ))}
      </div>
    </div>
  )
}

function PhotoGrid({ photos }: { photos: string[] }) {
  const visiblePhotos = photos.slice(0, 5)

  return (
    <div className="detail-field photo-field">
      <span>照片</span>
      {visiblePhotos.length > 0 ? (
        <div className="photo-grid">
          {visiblePhotos.map((photo, index) => (
            <img alt={`提交照片 ${index + 1}`} key={photo} src={photo} />
          ))}
        </div>
      ) : (
        <strong>未上传</strong>
      )}
    </div>
  )
}

function OrderProductList({ products }: { products: OrderProduct[] }) {
  return (
    <div className="order-products">
      {products.map((product) => (
        <div className="order-product-row" key={`${product.sku}-${product.variant}`}>
          <div className="product-thumb product-image">{product.name.slice(0, 1)}</div>
          <div className="order-product-main">
            <strong>{product.name}</strong>
            <div className="variant-line">
              <span>{product.variant}</span>
              <em>{product.sku}</em>
            </div>
          </div>
          <div className="unit-price">
            <strong>{product.unitPrice}</strong>
            {product.compareAtPrice && <span>{product.compareAtPrice}</span>}
          </div>
          <span className="quantity-pill">× {product.quantity}</span>
          <strong className="line-total">{product.totalPrice}</strong>
        </div>
      ))}
    </div>
  )
}

function OriginalOrderCard({ request }: { request: AfterSalesRequest }) {
  return (
    <section className="detail-section">
      <h3>申请订单</h3>
      <div className="order-card">
        <div className="fulfillment-box">
          <DetailField label="订单号" value={request.orderNo} />
          <DetailField label="下单日期" value={request.orderDate} />
          <DetailField label="下单地址" value={request.shippingAddress} />
        </div>
        <OrderProductList products={request.originalProducts} />
      </div>
    </section>
  )
}

function ProductListCard({
  products,
  title,
}: {
  products: OrderProduct[]
  title: string
}) {
  return (
    <section className="detail-section">
      <h3>{title}</h3>
      <div className="order-card product-list-card">
        <OrderProductList products={products} />
      </div>
    </section>
  )
}

function ReturnDetail({ request }: { request: AfterSalesRequest }) {
  return (
    <>
      <SubmissionInfo request={request} />

      <OriginalOrderCard request={request} />

      <ProductListCard products={request.returnProducts} title="退货商品列表" />
    </>
  )
}

function SubmissionInfo({ request }: { request: AfterSalesRequest }) {
  return (
    <section className="detail-section">
      <h3>提交信息</h3>
      <div className="detail-grid">
        <DetailField label="申请时间" value={request.appliedAt} />
        <TypeField type={request.type} />
        <DetailField label="用户邮箱" value={request.email} />
        <ReasonBreadcrumb items={request.reasonPath} />
        <PhotoGrid photos={request.photos} />
      </div>
    </section>
  )
}

function ExchangeDetail({ request }: { request: AfterSalesRequest }) {
  return (
    <>
      <SubmissionInfo request={request} />

      <OriginalOrderCard request={request} />

      <ProductListCard products={request.returnProducts} title="退货商品列表" />

      {request.replacementProducts && (
        <ProductListCard products={request.replacementProducts} title="补发商品列表" />
      )}
    </>
  )
}

function DetailDialog({
  request,
  onClose,
}: {
  request: AfterSalesRequest | null
  onClose: () => void
}) {
  if (!request) return null

  return (
    <div className="modal-backdrop" role="presentation">
      <section aria-modal="true" className="detail-dialog" role="dialog">
        <div className="dialog-header">
          <div className="dialog-title-block">
            <span className="dialog-eyebrow">{request.id}</span>
            <div className="dialog-title-row">
              <h2>申请详情</h2>
              <span className={`status-pill ${statusClassNames[request.status]}`}>
                {request.status}
              </span>
            </div>
          </div>
          <button className="icon-button" onClick={onClose} title="关闭" type="button">
            <X size={18} />
          </button>
        </div>

        <div className="dialog-body">
          {request.type === '退货' ? (
            <ReturnDetail request={request} />
          ) : (
            <ExchangeDetail request={request} />
          )}
        </div>

        {request.status === '待审核' && (
          <div className="dialog-footer">
            <button className="secondary-button" onClick={onClose} type="button">
              取消
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

function ReviewDialog({
  request,
  onClose,
}: {
  request: AfterSalesRequest | null
  onClose: () => void
}) {
  if (!request) return null

  return (
    <div className="modal-backdrop" role="presentation">
      <section aria-modal="true" className="detail-dialog review-dialog" role="dialog">
        <div className="dialog-header">
          <div className="dialog-title-block">
            <span className="dialog-eyebrow">{request.id}</span>
            <div className="dialog-title-row">
              <h2>退货审核</h2>
              <span className={`status-pill ${statusClassNames[request.status]}`}>
                {request.status}
              </span>
            </div>
          </div>
          <button className="icon-button" onClick={onClose} title="关闭" type="button">
            <X size={18} />
          </button>
        </div>

        <div className="dialog-body">
          <section className="detail-section">
            <h3>基础信息</h3>
            <div className="detail-grid">
              <TypeField type={request.type} />
              <DetailField label="平台单号" value={request.orderNo} />
              <ReasonBreadcrumb items={request.reasonPath} label="售后原因" />
            </div>
          </section>

          <ProductListCard products={request.returnProducts} title="退货商品列表" />

          <section className="detail-section">
            <h3>物流信息</h3>
            <div className="detail-grid">
              <DetailField label="承运商" value={request.returnLogistics.carrier} />
              <DetailField label="物流单号" value={request.returnLogistics.trackingNo} />
              <DetailField label="寄出时间" value={request.returnLogistics.shippedAt} />
            </div>
          </section>

          <section className="detail-section">
            <h3>发件人信息</h3>
            <div className="detail-grid">
              <DetailField label="发件人" value={request.sender.name} />
              <DetailField label="联系电话" value={request.sender.phone} />
              <DetailField label="发件地址" value={request.sender.address} />
            </div>
          </section>
        </div>

        <div className="dialog-footer">
          <button className="secondary-button" onClick={onClose} type="button">
            取消
          </button>
          <button className="secondary-button danger-button" type="button">
            拒绝
          </button>
          <button className="primary-button" type="button">
            同意
          </button>
        </div>
      </section>
    </div>
  )
}

function RequestTable({
  onView,
  onReview,
}: {
  onView: (request: AfterSalesRequest) => void
  onReview: (request: AfterSalesRequest) => void
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>申请编号</th>
            <th>申请时间</th>
            <th>订单号</th>
            <th>类型</th>
            <th>状态</th>
            <th>客户</th>
            <th>金额</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.appliedAt}</td>
              <td>{request.orderNo}</td>
              <td>{request.type}</td>
              <td>
                <span className={`status-pill ${statusClassNames[request.status]}`}>
                  {request.status}
                </span>
              </td>
              <td>{request.customer}</td>
              <td>{request.amount}</td>
              <td>
                <div className="row-actions">
                  <button className="text-button" onClick={() => onView(request)} type="button">
                    查看
                  </button>
                  {request.status === '待审核' && (
                    <button
                      className="text-button primary-text"
                      onClick={() => onReview(request)}
                      type="button"
                    >
                      审核
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ReturnExchangeManagement() {
  const [selectedRequest, setSelectedRequest] = useState<AfterSalesRequest | null>(null)
  const [reviewingRequest, setReviewingRequest] = useState<AfterSalesRequest | null>(null)

  return (
    <>
      <div className="toolbar">
        <label className="search-field">
          <Search size={18} />
          <input placeholder="搜索申请编号、订单号、客户邮箱或商品 SKU" />
        </label>
        <button className="secondary-button" type="button">
          批量审核
        </button>
      </div>
      <section className="panel">
        <div className="panel-title">
          <h2>退换货申请</h2>
          <span>5 条待处理</span>
        </div>
        <RequestTable onReview={setReviewingRequest} onView={setSelectedRequest} />
      </section>

      <DetailDialog request={selectedRequest} onClose={() => setSelectedRequest(null)} />
      <ReviewDialog request={reviewingRequest} onClose={() => setReviewingRequest(null)} />
    </>
  )
}
