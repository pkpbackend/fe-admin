import { useState } from "react";
import { Search } from "react-feather";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";

const Filter = (props) => {
  let { onSubmit, onReset, loading } = props;

  const [keyword, setKeyword] = useState("");

  const clickFilter = () => {
    onSubmit(keyword);
  };

  const clearFilter = () => {
    setKeyword("");
    onReset();
  };

  return (
    <Row>
      <Col md="12">
        <Card>
          <CardHeader>
            <CardTitle>Filter</CardTitle>
          </CardHeader>
          <CardBody style={{ paddingTop: 10 }}>
            <Row>
              <Col md="12">
                <FormGroup row>
                  <Label for="keyword" sm={2}>
                    Kata Kunci
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="keyword"
                      id="keyword"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      disabled={loading}
                    />
                  </Col>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <div className="filter-actions">
              <Button
                color="secondary"
                outline
                onClick={() => {
                  clearFilter();
                }}
                disabled={loading}
              >
                Reset
              </Button>
              <Button onClick={clickFilter} color="primary" disabled={loading}>
                {loading ? <Spinner size="sm" /> : <Search size={16} />}
                Cari FAQ
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );
};

export default Filter;
