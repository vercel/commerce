import Markdown from 'markdown-to-jsx';
import { Document, Image, Page, Text, StyleSheet, View, Link } from '@react-pdf/renderer';
import { Order, OrderConfirmationContent } from 'lib/shopify/types';
import { toPrintDate } from 'lib/utils';

const PDFPrice = ({
  style,
  amount,
  currencyCode = 'USD'
}: {
  style?: any;
  amount: string;
  currencyCode: string;
}) => {
  const price = parseFloat(amount);

  // Return 'Included' if price is 0
  if (price === 0) {
    return <Text style={style}>Free</Text>;
  }

  return (
    <Text style={style}>
      {new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol'
      }).format(price)}
    </Text>
  );
};

export default function OrderConfirmationPdf({
  content,
  order,
  signature1,
  signature2,
  date
}: {
  content: OrderConfirmationContent;
  order: Order;
  signature1: string;
  signature2: string;
  date: string;
}) {
  const styles = StyleSheet.create({
    logo: {
      width: 300,
      marginHorizontal: 'auto',
      marginBottom: 24
    },
    page: {
      padding: 48,
      paddingVertical: 64
    },
    h1: {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 12,
      color: content.color
    },
    h2: {
      fontSize: 14,
      fontWeight: 700,
      marginBottom: 12,
      color: content.color
    },
    h3: {
      fontSize: 12,
      fontWeight: 700,
      marginBottom: 12,
      color: content.color
    },
    p: {
      fontSize: 10,
      marginBottom: 12
    },
    span: {
      fontSize: 10
    },
    strong: {
      fontWeight: 700,
      fontSize: 10
    },
    a: {
      color: content.color,
      fontSize: 10,
      textDecoration: 'underline'
    },
    label: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#555'
    },
    tableRow: {
      display: 'flex',
      flexDirection: 'row',
      gap: 8
    },
    tableCell: {
      textAlign: 'left',
      fontSize: 10,
      paddingVertical: 12
    }
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={content?.logo?.url} style={styles.logo} />
          <Text style={styles.h3}>ORDER INFORMATION:</Text>
          <View>
            <Text style={styles.span}>Order number: {order.name}</Text>
            <Text style={styles.span}>Email: {order.customer?.emailAddress}</Text>
            <Text style={styles.p}>Date: {toPrintDate(order.processedAt)}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { marginBottom: 6 }]}>Shipping Address</Text>
              <View>
                <Text style={styles.span}>
                  {order.shippingAddress!.firstName} {order.shippingAddress!.lastName}
                </Text>
                <Text style={styles.span}>{order.shippingAddress!.address1}</Text>
                {order.shippingAddress!.address2 && (
                  <Text style={styles.p}>{order.shippingAddress!.address2}</Text>
                )}
                <Text style={styles.span}>
                  {order.shippingAddress!.city} {order.shippingAddress!.provinceCode}{' '}
                  {order.shippingAddress!.zip}
                </Text>
                <Text style={styles.p}>{order.shippingAddress!.country}</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { marginBottom: 6 }]}>Billing Address</Text>
              <View>
                <Text style={styles.span}>
                  {order.billingAddress!.firstName} {order.billingAddress!.lastName}
                </Text>
                <Text style={styles.span}>{order.billingAddress!.address1}</Text>
                {order.billingAddress!.address2 && (
                  <Text style={styles.span}>{order.billingAddress!.address2}</Text>
                )}
                <Text style={styles.span}>
                  {order.billingAddress!.city} {order.billingAddress!.provinceCode}{' '}
                  {order.billingAddress!.zip}
                </Text>
                <Text style={styles.p}>{order.billingAddress!.country}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.label}>Payment</Text>
            <View>
              <Text style={styles.p}>
                {order.transactions[0]?.paymentDetails
                  ? `Ending with ${order.transactions[0]!.paymentDetails.last4} - `
                  : 'Manual - '}
                <PDFPrice
                  amount={order.transactions[0]!.transactionAmount.amount}
                  currencyCode={order.transactions[0]!.transactionAmount.currencyCode}
                />
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.tableRow}>
              <Text style={[styles.label, { width: '70%' }]}>Products</Text>
              <Text style={[styles.label, { width: '15%' }]}>Quantity</Text>
              <Text style={[styles.label, { width: '15%' }]}>Price</Text>
            </View>
            <View
              style={{
                width: '100%',
                borderBottom: '1px solid #333',
                marginTop: 6,
                marginBottom: 8
              }}
            />
            {order.lineItems.map((lineItem, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, { width: '70%' }]}>{lineItem.title}</Text>
                <Text style={[styles.tableCell, { width: '15%' }]}>{lineItem.quantity}</Text>
                <PDFPrice
                  style={[styles.tableCell, { width: '15%' }]}
                  amount={lineItem.totalPrice!.amount}
                  currencyCode={lineItem.totalPrice!.currencyCode}
                />
              </View>
            ))}
            <View
              style={{
                width: '100%',
                borderBottom: '1px solid black',
                marginTop: 6,
                marginBottom: 8
              }}
            />
            <View style={{ width: '150px', marginLeft: 'auto', marginRight: '20' }}>
              <View
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <Text style={styles.span}>Subtotal</Text>
                <PDFPrice
                  style={styles.span}
                  amount={order.subtotal!.amount}
                  currencyCode={order.subtotal!.currencyCode}
                />
              </View>
              <View
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <Text style={styles.span}>Shipping</Text>
                <PDFPrice
                  style={styles.span}
                  amount={order.shippingMethod!.price.amount}
                  currencyCode={order.shippingMethod!.price.currencyCode}
                />
              </View>
              <View
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <Text style={styles.span}>Total</Text>
                <PDFPrice
                  style={styles.span}
                  amount={order.totalPrice!.amount}
                  currencyCode={order.totalPrice!.currencyCode}
                />
              </View>
            </View>
          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <Markdown
          options={{
            wrapper: View,
            overrides: {
              h1: {
                component: Text,
                props: {
                  style: styles.h1
                }
              },
              h2: {
                component: Text,
                props: {
                  style: styles.h2
                }
              },
              h3: {
                component: Text,
                props: {
                  style: styles.h3
                }
              },
              p: {
                component: Text,
                props: {
                  style: styles.p
                }
              },
              strong: {
                component: Text,
                props: {
                  style: styles.strong
                }
              },
              a: {
                component: Link,
                props: {
                  style: styles.a
                }
              }
            }
          }}
        >
          {content.body}
        </Markdown>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={[styles.p, { flex: 1 }]}>Date:</Text>
          <Text style={[styles.p, { flex: 1 }]}>{toPrintDate(date)}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={[styles.p, { flex: 1 }]}>Print your name to sign:</Text>
          <Text style={[styles.p, { flex: 1 }]}>{signature1}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={[styles.p, { flex: 1 }]}>
            Credit card holder&apos;s electronic signature
          </Text>
          <Text style={[styles.p, { flex: 1 }]}>{signature2}</Text>
        </View>
      </Page>
    </Document>
  );
}
