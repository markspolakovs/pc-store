import * as React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button
} from "reactstrap";
import { without } from "lodash";

import { Product } from "./types";
import { RootState } from "../state";
import * as cartState from "../Cart/state";
import { makePrice } from "../helpers";

interface RouteParams {
  id: string;
}

type RouteProps = RouteComponentProps<RouteParams>;

interface Props {
  products: Product[];
  addToCart: (item: Product) => void;
}

const notFound = () => (
  <Container>
    <Row>
      <Col>
        <h2>This product was not found.</h2>
      </Col>
    </Row>
  </Container>
);

const ProductComponent: React.SFC<Props & RouteProps> = (
  props: Props & RouteProps
) => {
  const { products, addToCart } = props;
  const { id } = props.match.params;
  const product = products.find(x => x.id === id);
  if (!product) {
    return notFound();
  }
  const productsExceptCurrent = without(products, product);
  const cols = productsExceptCurrent.map(item => (
    <Col key={item.id} md="4">
      <Card>
        <CardBody>
          <CardTitle>
            <Link to={`/product/${item.id}`}>{item.name}</Link>
          </CardTitle>
          <h5>
            {makePrice(item.price)}
          </h5>
          <Button
            color={item.available ? "primary" : "disabled"}
            onClick={() => item.available && addToCart(item)}
          >
            {item.available ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardBody>
      </Card>
    </Col>
  ));
  const rows: JSX.Element[] = [];
  let buffer: JSX.Element[] = [];
  cols.forEach((item, index) => {
    buffer.push(item);
    if (index % 3 === 2 || index === cols.length - 1) {
      rows.push(<Row key={index}>{buffer.slice()}</Row>);
      buffer = [];
    }
  });
  return (
    <Container>
      <Row>
        <Col lg="6">
          <img
            width="450"
            src={
              product.imageUrl ||
              "http://via.placeholder.com/450x250?text=test+image+pls+ignore"
            }
          />
        </Col>
        <Col lg="6">
          <h2>{product.name}</h2>
          <div>
            <b>
              {makePrice(product.price)}
            </b>
          </div>
          <Button
            color={product.available ? "primary" : "disabled"}
            onClick={() => product.available && addToCart(product)}
          >
            {product.available ? "Add to Cart" : "Out of Stock"}
          </Button>
          <p>{product.description}</p>
        </Col>
      </Row>
      {!!product.faq && (
        <Row>
          <Col>
            <h3>Frequently Asked Questions</h3>
            <ul>
              {product.faq.map(faq => (
                <li>
                  <b>{faq.question}</b>
                  <br />
                  {faq.answer}
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      )}
      <Row>
        <i>Other products you might like:</i>
      </Row>
      {rows}
    </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  products: state.product.products
});

const mapDispatchToProps = (dispatch: Dispatch<RootState>) =>
  bindActionCreators({
      addToCart: cartState.actions.addItem
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent as any); // TODO figure out this error
