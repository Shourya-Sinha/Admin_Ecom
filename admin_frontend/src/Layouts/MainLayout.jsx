import { Box, IconButton, Popover, Stack } from '@mui/material'
import {
    AppstoreAddOutlined,
    BgColorsOutlined,
    BookOutlined,
    CopyrightOutlined,
    DashboardOutlined,
    FolderViewOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ProductOutlined,
    QuestionOutlined,
    SettingFilled,
    UnorderedListOutlined,
    UserOutlined,
  } from '@ant-design/icons';
  import { Button, Layout, Menu, theme } from 'antd';
import { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AccountCircle, LocalOffer } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { authBaseUrl, logoutUser, resetAuthStateLogout } from '../Redux/Slices/AusthSlice';
import axios from 'axios';
  const { Header, Sider, Content } = Layout;

const MainLayout = (theme) => {
  const {isLoggedIn} = useSelector((state)=> state.auth);
  const token = useSelector((state) => state.auth.token);

  const user = useSelector((state)=>state.auth);
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const [anchorEl, setASnchorEl] = useState(null);
    const dispatch = useDispatch();

    const handleClick = (event) => {
      setASnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setASnchorEl(null);
    };
    const open= Boolean(anchorEl);

  const handleLogout = async() => {
    try {
      await dispatch(logoutUser());
    } catch (error) {
      dispatch(resetAuthStateLogout());
    }

  };
  // useEffect(() => {
  //   // Function to check if the token is expired
  //   const checkTokenExpiration = async () => {
  //     try {
  //       const response = await axios.post(`${authBaseUrl}/check-token`, { token });

  //       if (response.data.expired) {
  //         // If token is expired, trigger logout
  //         dispatch(logoutUser());
  //       } else {
  //         console.log('Token is valid.');
  //       }
  //     } catch (error) {
  //       console.error('Error checking token:', error);
  //       // Only log out on an explicit expired error, handle other errors accordingly
  //       if (error.response && error.response.data.expired) {
  //         dispatch(logoutUser());
  //       }
  //     }
  //   };

  //   // Only check if there is a token
  //   if (token) {
  //     checkTokenExpiration();
  //   }
  // }, [token, dispatch]);

  if(!isLoggedIn) {
    return <Navigate to={'/login'} />;
  };
  return (
    <>
  <Layout style={{height:'100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">
          <h2 className="logoname fs-5 py-3 text-center mb-0">
            <span className="lg-logo" color='white' style={{color:'white'}}>ShopEase</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          onClick={({key}) => {
            if(key == 'sifnout'){

            }else{
                navigate(key) 
            }
          }}
          items={[
            {
              key: '/',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
            },
           
            {
                key: 'brand',
                icon: <BookOutlined />,
                label: 'Brand',
                children:[
                    {
                        key: "addBrand",
                        icon: <AppstoreAddOutlined />,
                        label: "Add Brands",
                      },
                      {
                        key: "viewBrand",
                        icon: <FolderViewOutlined />,
                        label: "View All Brand",
                      },
                ]
              },
            {
                key: 'category',
                icon: <CopyrightOutlined />,
                label: 'Category',
                children:[
                    {
                        key: "addCategory",
                        icon: <AppstoreAddOutlined />,
                        label: "Add Category",
                      },
                      {
                        key: "viewCategory",
                        icon: <FolderViewOutlined />,
                        label: "View All Category",
                      },
                ]
              },
              {
                key: 'color',
                icon: <BgColorsOutlined />,
                label: 'Color',
                children:[
                    {
                        key: "addColor",
                        icon: <AppstoreAddOutlined />,
                        label: "Add Color",
                      },
                      {
                        key: "viewColor",
                        icon: <FolderViewOutlined />,
                        label: "View All Color",
                      },
                ]
              },
            {
              key: 'product',
              icon: <ProductOutlined />,
              label: 'Product',
              children:[
                {
                    key: "addProduct",
                    icon: <AppstoreAddOutlined />,
                    label: "Add Product",
                  },
                  {
                    key: "viewproduct",
                    icon: <FolderViewOutlined />,
                    label: "View All Products",
                  },
                  {
                    key: `edit-product/:productId`,
                    icon: <FolderViewOutlined />,
                    label: "Update Product",
                  },
            ]
            },
            {
                key: 'order',
                icon: <UnorderedListOutlined />,
                label: 'Orders',
                children:[
                  {
                      key: "vewOrders",
                      icon: <FolderViewOutlined />,
                      label: "View All Orders",
                    },
                    {
                      key: "enquiry",
                      icon: <QuestionOutlined />,
                      label: "Enquires",
                    },
              ]
              },
              {
                key: 'coupon',
                icon: <LocalOffer />,
                label: 'Coupons',
                children:[
                  {
                      key: "vewCoupons",
                      icon: <FolderViewOutlined />,
                      label: "View All Coupons",
                    },
                    {
                      key: "createCoupon",
                      icon: <AppstoreAddOutlined />,
                      label: "Create Coupon",
                    },
              ]
              },
              {
                key: 'profile',
                icon: <UserOutlined />,
                label: 'Admin Details',
              },
          ]}
        />
      </Sider>
      <Layout style={{minHeight:'100vh'}}>
        <Header
          style={{
            paddingY: '16px',
            background: "#fff",
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center'
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
           <div style={{display:'flex', alignItems:'center'}}>
            <img
              className="rounded"
              style={{ height: '32px', width: '32px',borderRadius:'50%' }}
              src="https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <div style={{ lineHeight: 0 ,paddingLeft:'10px'}}>
              <h5 className="text-dark" style={{ fontSize: '14px' }}>
                {user.email}
              </h5>
              <p className="mb-0" style={{ fontSize: '13px' }}>
                Admin
              </p>
            </div>
            <Box>
                <IconButton >
                    <SettingFilled />
                </IconButton>
                <IconButton onClick={handleClick}>
                    <AccountCircle />
                </IconButton>
                <Popover onClose={handleClose} anchorEl={anchorEl} open={open} anchorOrigin={{vertical:'bottom',horizontal:'center'}}>
                    <Stack direction={'column'} padding={2} spacing={1}>
                        
                    <Link style={{textDecoration:'none',pointerEvents: isLoggedIn ? 'none' : 'auto', opacity: isLoggedIn? 0.5 :1}} to={'login'}>Login</Link> 
                    <Link style={{textDecoration:'none',pointerEvents: isLoggedIn ? 'none' : 'auto', opacity: isLoggedIn? 0.5 :1}} to={'register'}>Register</Link>
                    <Button onClick={handleLogout}  style={{textDecoration:'none',pointerEvents: isLoggedIn ? 'auto' : 'none', opacity: isLoggedIn? 1 :0.5}} >Logout</Button>
                    </Stack>

                </Popover>
            </Box>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
              minHeight: 280,
            background: '#f0f2f5',
            overflowY:'auto'
            // borderRadius: '#fff',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
    </>
  )
}

export default MainLayout