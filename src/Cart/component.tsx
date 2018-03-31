import * as React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
const Ionicon = require("react-ionicons");
import { Popover, PopoverBody, Button, Table } from "reactstrap";
import * as firebase from "firebase";
import "@firebase/firestore";

import * as cartState from "./state";
import { Product } from "../Product/types";
import { RootState } from "../state";
import { makePrice, fiddlesticks } from "../helpers";

interface Props {
  items: Product[];
  total: number;
  clearCart: () => void;
  epilepsy: boolean;
}

interface State {
  popoverOpen: boolean;
}

class Cart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      popoverOpen: false
    };
  }

  togglePopover = () => {
    this.setState(state => ({ popoverOpen: !state.popoverOpen }));
  };

  sendAnalytics = () => {
    const { total, items, clearCart } = this.props;
    let itemsGrouped: {
      [key: string]: { product: Product; count: number };
    } = {};
    if (this.state.popoverOpen) {
      items.forEach(item => {
        if (item.id in itemsGrouped) {
          itemsGrouped[item.id].count++;
        } else {
          itemsGrouped[item.id] = {
            product: item,
            count: 1
          };
        }
      });
    }
    window.gtag("event", "purchase", {
      transaction_id: +new Date(),
      value: total / 100,
      currency: "EUR",
      tax: 0,
      shipping: 0,
      items: Object.keys(itemsGrouped)
        .map(k => itemsGrouped[k])
        .map(group =>
          Object.assign({}, group.product, {
            price: group.product.price / 100,
            quantity: group.count
          })
        )
    });
    firebase
      .firestore()
      .collection("orders")
      .add({
        ts: new Date().toISOString(),
        total,
        items: Object.keys(itemsGrouped)
          .map(k => itemsGrouped[k])
          .map(group =>
            Object.assign({}, group.product, {
              quantity: group.count
            })
          )
      });
  };

  render() {
    const { total, items, clearCart } = this.props;
    let itemsGrouped: {
      [key: string]: { product: Product; count: number };
    } = {};
    if (this.state.popoverOpen) {
      items.forEach(item => {
        if (item.id in itemsGrouped) {
          itemsGrouped[item.id].count++;
        } else {
          itemsGrouped[item.id] = {
            product: item,
            count: 1
          };
        }
      });
    }
    return (
      <div>
        <Button id="CartPopover" onClick={this.togglePopover}>
          <span style={{ color: total > 0 ? "white" : "inherit" }}>
            {makePrice(total)}
          </span>
          <Ionicon
            icon={total > 0 ? "ios-cart" : "ios-cart-outline"}
            color="white"
          />
        </Button>
        <Popover
          isOpen={this.state.popoverOpen}
          toggle={this.togglePopover}
          target="CartPopover"
        >
          <PopoverBody>
            {items.length === 0 ? (
              <span>Cart is empty, go shopping!</span>
            ) : (
              <div>
                <Table hover size="sm">
                  <tbody>
                    {Object.keys(itemsGrouped)
                      .map(k => itemsGrouped[k])
                      .map(item => (
                        <tr key={item.product.id}>
                          <td>{item.product.name}</td>
                          <td>x{item.count}</td>
                        </tr>
                      ))}
                    <tr>
                      <td>Total</td>
                      <td>{makePrice(total)}</td>
                    </tr>
                  </tbody>
                </Table>
                <Button color="danger" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Button
                  color="success"
                  onClick={() => {
                    this.sendAnalytics();
                    fiddlesticks();
                    clearCart();
                  }}
                >
                  Checkout
                </Button>
              </div>
            )}
          </PopoverBody>
        </Popover>
        {this.props.epilepsy && (
          <style>
            {`
                    @keyframes epilepsy {
                        0% { background-color: red; }
                        20% { background-color: orange; }
                        40% { background-color: yellow; }
                        60% { background-color: green; }
                        80% { background-color: purple; }
                        100% { background-color: red; }
                    }
                    * {
                      animation: 1s epilepsy infinite;
                    }
                    *:nth-child(5n+1) {
                        animation-delay: 200ms;
                    }
                    *:nth-child(5n+2) {
                        animation-delay: 400ms;
                    }
                    *:nth-child(5n+3) {
                        animation-delay: 600ms;
                    }
                    *:nth-child(5n+4) {
                        animation-delay: 800ms;
                    }
                `}
          </style>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  items: cartState.selectors.items(state),
  total: cartState.selectors.total(state),
  epilepsy: cartState.selectors.epilepsy(state)
});

const mapDispatchToProps = (dispatch: Dispatch<RootState>) =>
  bindActionCreators(
    {
      clearCart: cartState.actions.clearCart
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Cart as any);
