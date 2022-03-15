import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { CartState } from "../context/Context";
import logo from '../img/ridvanucdag.jpg'
import "./Header.css"

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <Navbar className="genel">
      <Container>
      <Navbar.Brand>
             <Link to='/'><img className="logo" src={logo}/></Link>
          </Navbar.Brand>
        {useLocation().pathname.split("/")[1] !== "cart" && (
          <Navbar.Text className="search">
            <div className='FormControl'>
            <FormControl
              style={{borderRadius:1,height:50}}
              type="search"
              placeholder="Ürün Ara..."
              className="m-auto"
              aria-label="Search"
              onChange={(e) => {
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
            </div>
          </Navbar.Text>
        )}
        <Nav>
          <Dropdown alignRight>
            <Dropdown.Toggle variant="light">
              Sepet
              
            </Dropdown.Toggle>
            
            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((prod) => (
                    <span className="cartitem" key={prod.id}>
                      <img
                        src={prod.image}
                        className="cartItemImg"
                        alt={prod.name}
                      />
                      <div className="cartItemDetail">
                        <span>{prod.name}</span>
                        <span>{prod.price.split(".")[0]} TL</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Siparişi Tamamla
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Sepetin şu an boş</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
        <Badge className="Badge">{cart.length}</Badge>
      </Container>
    </Navbar>
  );
};

export default Header;
