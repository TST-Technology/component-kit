/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Nav, NavItem, Collapse } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { adminRoot } from 'constants/defaultValues';

import {
  setContainerClassnames,
  addContainerClassname,
  changeDefaultClassnames,
  changeSelectedMenuHasSubItems,
} from 'redux/actions';
import { getCategory } from 'utils/API/api';
import { CATEGORY } from 'utils/CONSTANTS';

const SubNavBarStyle = {
  display: 'flex',
  alignItems: 'center',
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedParentMenu: '',
      viewingParentMenu: '',
      collapsedMenus: [],
      menuItems: [],
    };
  }

  // eslint-disable-next-line react/sort-comp
  handleWindowResize = (event) => {
    if (event && !event.isTrusted) {
      return;
    }
    const { containerClassnames } = this.props;
    const nextClasses = this.getMenuClassesForResize(containerClassnames);
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setContainerClassnames(
      0,
      nextClasses.join(' '),
      // eslint-disable-next-line react/destructuring-assignment
      this.props.selectedMenuHasSubItems
    );
  };

  handleDocumentClick = (e) => {
    const container = this.getContainer();
    let isMenuClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('menu-button') ||
        e.target.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      (e.target.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.parentElement &&
      e.target.parentElement.parentElement.classList &&
      (e.target.parentElement.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.parentElement.classList.contains(
          'menu-button-mobile'
        ))
    ) {
      isMenuClick = true;
    }
    if (container.contains(e.target) || container === e.target || isMenuClick) {
      return;
    }
    this.setState({
      viewingParentMenu: '',
    });
    this.toggle();
  };

  getMenuClassesForResize = (classes) => {
    const { menuHiddenBreakpoint, subHiddenBreakpoint } = this.props;
    let nextClasses = classes.split(' ').filter((x) => x !== '');
    const windowWidth = window.innerWidth;
    if (windowWidth < menuHiddenBreakpoint) {
      nextClasses.push('menu-mobile');
    } else if (windowWidth < subHiddenBreakpoint) {
      nextClasses = nextClasses.filter((x) => x !== 'menu-mobile');
      if (
        nextClasses.includes('menu-default') &&
        !nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses.push('menu-sub-hidden');
      }
    } else {
      nextClasses = nextClasses.filter((x) => x !== 'menu-mobile');
      if (
        nextClasses.includes('menu-default') &&
        nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses = nextClasses.filter((x) => x !== 'menu-sub-hidden');
      }
    }
    return nextClasses;
  };

  getContainer = () => {
    // eslint-disable-next-line react/no-find-dom-node
    return ReactDOM.findDOMNode(this);
  };

  getMenu = () => {
    (async () => {
      const res = await getCategory();
      const Category = res?.data?.data?.data;
      CATEGORY.list = Category;
      if (Category !== -1) {
        this.setState({
          menuItems: [
            {
              id: 'dashboards',
              icon: 'iconsminds-shop-4',
              label: 'Dashboards',
              to: `${adminRoot}/dashboards`,
            },
            {
              id: 'corporate',
              icon: 'iconsminds-data-center',
              label: 'B2B',
              to: `${adminRoot}/corporate`,
              subs: [
                {
                  icon: 'iconsminds-building',
                  label: 'Corporate',
                  to: `${adminRoot}/corporate`,
                },
                {
                  icon: 'iconsminds-library',
                  label: 'Plans',
                  to: `${adminRoot}/plans`,
                },
              ],
            },

            {
              id: 'menu',
              icon: 'simple-icon-user',
              label: 'Admin',
              to: `${adminRoot}/admin`,
            },
            {
              id: 'directory',
              icon: 'iconsminds-user',
              label: 'Directory',
              to: `${adminRoot}/directory/userlist`,
            },
            {
              id: 'category',
              icon: 'simple-icon-layers',
              label: 'Category',
              to: `${adminRoot}/categories`,
            },
            {
              id: 'advisor',
              icon: 'iconsminds-student-male',
              label: 'Advisor',
              to: `${adminRoot}/advisor`,
              subs: Category.map((MenuItem) => {
                return {
                  icon: 'iconsminds-student-male-female',
                  label: MenuItem?.expertise,
                  to: `${adminRoot}/advisor/${MenuItem?.expertise}`,
                };
              }),
            },

            {
              id: 'coupons',
              icon: 'simple-icon-badge',
              label: 'Coupons',
              to: `${adminRoot}/coupons`,
            },
            {
              id: 'account',
              icon: 'iconsminds-money-bag',
              label: 'Account',
              to: `${adminRoot}/account/advisor-transaction`,
            },
            {
              id: 'menu2',
              icon: 'iconsminds-notepad',
              label: 'Menu',
              to: `${adminRoot}/request`,
            },
            {
              id: 'kyc',
              icon: 'iconsminds-qr-code',
              label: 'Kyc',
              to: `${adminRoot}/kyc`,
              subs: Category.map((MenuItem) => {
                return {
                  icon: 'iconsminds-student-male-female',
                  label: MenuItem?.expertise,
                  to: `${adminRoot}/kyc/${MenuItem?.expertise}`,
                };
              }),
            },
            {
              id: 'docs',
              icon: 'iconsminds-library',
              label: 'Customize-field',
              to: `${adminRoot}/customize-field`,
              subs: [
                {
                  icon: 'simple-icon-notebook',
                  label: 'Call-amount',
                  to: `${adminRoot}/customize-field/call-amount`,
                  subs: Category.map((MenuItem) => {
                    return {
                      icon: 'iconsminds-student-male-female',
                      label: MenuItem?.expertise,
                      to: `${adminRoot}/customize-field/call-amount/${MenuItem?.expertise}`,
                    };
                  }),
                },
                {
                  icon: 'simple-icon-notebook',
                  label: 'Expertise',
                  to: `${adminRoot}/customize-field/expertise`,
                  subs: Category.map((MenuItem) => {
                    return {
                      icon: 'iconsminds-student-male-female',
                      label: MenuItem?.expertise,
                      to: `${adminRoot}/customize-field/expertise/${MenuItem?.expertise}`,
                    };
                  }),
                },
                {
                  icon: 'simple-icon-notebook',
                  label: 'Call-sessions',
                  to: `${adminRoot}/customize-field/call_session`,
                  subs: Category.map((MenuItem) => {
                    return {
                      icon: 'iconsminds-student-male-female',
                      label: MenuItem?.expertise,
                      to: `${adminRoot}/customize-field/call_session/${MenuItem?.expertise}`,
                    };
                  }),
                },
                {
                  icon: 'simple-icon-layers',
                  label: 'Banner',
                  to: `${adminRoot}/customize-field/banner`,
                },
                {
                  icon: 'simple-icon-settings',
                  label: 'Setting',
                  to: `${adminRoot}/customize-field/setting`,
                },
              ],
            },
            {
              id: 'noKyc',
              icon: 'iconsminds-notepad',
              label: 'No Kyc',
              to: `${adminRoot}/noKyc`,
            },
          ],
        });
      }
    })();
  };

  toggle = () => {
    const hasSubItems = this.getIsHasSubItem();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.changeSelectedMenuHasSubItems(hasSubItems);
    const { containerClassnames, menuClickCount } = this.props;
    const currentClasses = containerClassnames
      ? containerClassnames.split(' ').filter((x) => x !== '')
      : '';
    let clickIndex = -1;

    if (!hasSubItems) {
      if (
        currentClasses.includes('menu-default') &&
        (menuClickCount % 4 === 0 || menuClickCount % 4 === 3)
      ) {
        clickIndex = 1;
      } else if (
        currentClasses.includes('menu-sub-hidden') &&
        (menuClickCount === 2 || menuClickCount === 3)
      ) {
        clickIndex = 0;
      } else if (
        currentClasses.includes('menu-hidden') ||
        currentClasses.includes('menu-mobile')
      ) {
        clickIndex = 0;
      }
    } else if (
      currentClasses.includes('menu-sub-hidden') &&
      menuClickCount === 3
    ) {
      clickIndex = 2;
    } else if (
      currentClasses.includes('menu-hidden') ||
      currentClasses.includes('menu-mobile')
    ) {
      clickIndex = 0;
    }
    if (clickIndex >= 0) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.setContainerClassnames(
        clickIndex,
        containerClassnames,
        hasSubItems
      );
    }
  };

  handleProps = () => {
    this.addEvents();
  };

  addEvents = () => {
    ['click', 'touchstart', 'touchend'].forEach((event) =>
      document.addEventListener(event, this.handleDocumentClick, true)
    );
  };

  removeEvents = () => {
    ['click', 'touchstart', 'touchend'].forEach((event) =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    );
  };

  setSelectedLiActive = (callback) => {
    const oldli = document.querySelector('.sub-menu  li.active');
    if (oldli != null) {
      oldli.classList.remove('active');
    }

    const oldliSub = document.querySelector('.third-level-menu  li.active');
    if (oldliSub != null) {
      oldliSub.classList.remove('active');
    }

    /* set selected parent menu */
    const selectedSublink = document.querySelector(
      '.third-level-menu  a.active'
    );
    if (selectedSublink != null) {
      selectedSublink.parentElement.classList.add('active');
    }

    const selectedlink = document.querySelector('.sub-menu  a.active');
    if (selectedlink != null) {
      selectedlink.parentElement.classList.add('active');
      this.setState(
        {
          selectedParentMenu:
            selectedlink.parentElement.parentElement.getAttribute(
              'data-parent'
            ),
        },
        callback
      );
    } else {
      const selectedParentNoSubItem = document.querySelector(
        '.main-menu  li a.active'
      );
      if (selectedParentNoSubItem != null) {
        this.setState(
          {
            selectedParentMenu:
              selectedParentNoSubItem.getAttribute('data-flag'),
          },
          callback
        );
        // eslint-disable-next-line react/destructuring-assignment
      } else if (this.state.selectedParentMenu === '') {
        const { menuItems } = this.state;
        this.setState(
          {
            selectedParentMenu: menuItems.length > 0 ? menuItems[0].id : '',
          },
          callback
        );
      }
    }
  };

  setHasSubItemStatus = () => {
    const hasSubmenu = this.getIsHasSubItem();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.changeSelectedMenuHasSubItems(hasSubmenu);
    this.toggle();
  };

  getIsHasSubItem = () => {
    const { selectedParentMenu, menuItems } = this.state;
    const menuItem = menuItems.find((x) => x.id === selectedParentMenu);
    if (menuItem)
      return !!(menuItem && menuItem.subs && menuItem.subs.length > 0);
    return false;
  };

  // eslint-disable-next-line react/sort-comp
  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setSelectedLiActive(this.setHasSubItemStatus);

      window.scrollTo(0, 0);
    }
    this.handleProps();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
    this.handleWindowResize();
    this.handleProps();
    this.setSelectedLiActive(this.setHasSubItemStatus);
    this.getMenu();
  }

  componentWillUnmount() {
    this.removeEvents();
    window.removeEventListener('resize', this.handleWindowResize);
  }

  openSubMenu = (e, menuItem) => {
    const selectedParent = menuItem.id;
    const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.changeSelectedMenuHasSubItems(hasSubMenu);
    if (!hasSubMenu) {
      this.setState({
        viewingParentMenu: selectedParent,
        selectedParentMenu: selectedParent,
      });
      this.toggle();
    } else {
      e.preventDefault();

      const { containerClassnames, menuClickCount } = this.props;
      const currentClasses = containerClassnames
        ? containerClassnames.split(' ').filter((x) => x !== '')
        : '';

      if (!currentClasses.includes('menu-mobile')) {
        if (
          currentClasses.includes('menu-sub-hidden') &&
          (menuClickCount === 2 || menuClickCount === 0)
        ) {
          // eslint-disable-next-line react/destructuring-assignment
          this.props.setContainerClassnames(3, containerClassnames, hasSubMenu);
        } else if (
          currentClasses.includes('menu-hidden') &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          // eslint-disable-next-line react/destructuring-assignment
          this.props.setContainerClassnames(2, containerClassnames, hasSubMenu);
        } else if (
          currentClasses.includes('menu-default') &&
          !currentClasses.includes('menu-sub-hidden') &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          // eslint-disable-next-line react/destructuring-assignment
          this.props.setContainerClassnames(0, containerClassnames, hasSubMenu);
        }
      } else {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.addContainerClassname(
          'sub-show-temporary',
          containerClassnames
        );
      }
      this.setState({
        viewingParentMenu: selectedParent,
      });
    }
  };

  toggleMenuCollapse = (e, menuKey) => {
    e.preventDefault();

    const { collapsedMenus } = this.state;
    if (collapsedMenus.indexOf(menuKey) > -1) {
      this.setState({
        collapsedMenus: collapsedMenus.filter((x) => x !== menuKey),
      });
    } else {
      collapsedMenus.push(menuKey);
      this.setState({
        collapsedMenus,
      });
    }
    return false;
  };

  // eslint-disable-next-line no-shadow
  filteredList = (menuItems) => {
    // const { currentUser } = this.props;
    // const { menuItems } = this.state;
    // if (currentUser) {
    //   return menuItems.filter(
    //     (x) => (x.roles && x.roles.includes(currentUser.role)) || !x.roles
    //   );
    // }
    return menuItems;
  };

  render() {
    const { selectedParentMenu, viewingParentMenu, collapsedMenus, menuItems } =
      this.state;
    return (
      <div className="sidebar">
        <div className="main-menu">
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className="list-unstyled">
                {menuItems &&
                  this.filteredList(menuItems).map((item) => {
                    return (
                      <NavItem
                        key={item.id}
                        className={classnames({
                          active:
                            (selectedParentMenu === item.id &&
                              viewingParentMenu === '') ||
                            viewingParentMenu === item.id,
                        })}
                      >
                        {item.newWindow ? (
                          <a
                            href={item.to}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <i className={item.icon} /> <p>{item.label}</p>
                          </a>
                        ) : (
                          <NavLink
                            to={item.to}
                            onClick={(e) => this.openSubMenu(e, item)}
                            data-flag={item.id}
                          >
                            <i className={item.icon} /> <p>{item.label}</p>
                          </NavLink>
                        )}
                      </NavItem>
                    );
                  })}
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>

        <div className="sub-menu">
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              {menuItems &&
                this.filteredList(menuItems).map((item) => {
                  return (
                    <Nav
                      key={item.id}
                      className={classnames({
                        'd-block':
                          // eslint-disable-next-line react/destructuring-assignment
                          (this.state.selectedParentMenu === item.id &&
                            // eslint-disable-next-line react/destructuring-assignment
                            this.state.viewingParentMenu === '') ||
                          // eslint-disable-next-line react/destructuring-assignment
                          this.state.viewingParentMenu === item.id,
                      })}
                      data-parent={item.id}
                    >
                      {item.subs &&
                        this.filteredList(item.subs).map((sub, index) => {
                          return (
                            <NavItem
                              key={`${item.id}_${index}`}
                              className={`${
                                sub.subs && sub.subs.length > 0
                                  ? 'has-sub-item'
                                  : ''
                              }`}
                            >
                              {/* eslint-disable-next-line no-nested-ternary */}
                              {sub.newWindow ? (
                                <a
                                  href={sub.to}
                                  rel="noopener noreferrer"
                                  target="_blank"
                                  style={SubNavBarStyle}
                                >
                                  <i className={sub.icon} /> <p>{sub.label}</p>
                                </a>
                              ) : sub.subs && sub.subs.length > 0 ? (
                                <>
                                  <NavLink
                                    className={`rotate-arrow-icon opacity-50 ${
                                      collapsedMenus.indexOf(
                                        `${item.id}_${index}`
                                      ) === -1
                                        ? ''
                                        : 'collapsed'
                                    }`}
                                    to={sub.to}
                                    id={`${item.id}_${index}`}
                                    onClick={(e) =>
                                      this.toggleMenuCollapse(
                                        e,
                                        `${item.id}_${index}`
                                      )
                                    }
                                    style={SubNavBarStyle}
                                  >
                                    <i className="simple-icon-arrow-down" />{' '}
                                    <p>{sub.label}</p>
                                  </NavLink>

                                  <Collapse
                                    isOpen={
                                      collapsedMenus.indexOf(
                                        `${item.id}_${index}`
                                      ) === -1
                                    }
                                  >
                                    <Nav className="third-level-menu">
                                      {this.filteredList(sub.subs).map(
                                        (thirdSub, thirdIndex) => {
                                          return (
                                            <NavItem
                                              key={`${item.id}_${index}_${thirdIndex}`}
                                            >
                                              {thirdSub.newWindow ? (
                                                <a
                                                  href={thirdSub.to}
                                                  rel="noopener noreferrer"
                                                  target="_blank"
                                                  style={SubNavBarStyle}
                                                >
                                                  <i
                                                    className={thirdSub.icon}
                                                  />
                                                  <p>{thirdSub.label}</p>
                                                </a>
                                              ) : (
                                                <NavLink
                                                  to={thirdSub.to}
                                                  style={SubNavBarStyle}
                                                >
                                                  <i
                                                    className={thirdSub.icon}
                                                  />{' '}
                                                  <p>{thirdSub.label}</p>
                                                </NavLink>
                                              )}
                                            </NavItem>
                                          );
                                        }
                                      )}
                                    </Nav>
                                  </Collapse>
                                </>
                              ) : (
                                <NavLink to={sub.to} style={SubNavBarStyle}>
                                  <i className={sub.icon} /> <p>{sub.label}</p>
                                </NavLink>
                              )}
                            </NavItem>
                          );
                        })}
                    </Nav>
                  );
                })}
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ menu, authUser }) => {
  const {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount,
    selectedMenuHasSubItems,
  } = menu;

  const { currentUser } = authUser;
  return {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount,
    selectedMenuHasSubItems,
    currentUser,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    setContainerClassnames,
    addContainerClassname,
    changeDefaultClassnames,
    changeSelectedMenuHasSubItems,
  })(Sidebar)
);
