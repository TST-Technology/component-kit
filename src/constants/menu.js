import { adminRoot } from './defaultValues';

const data = () => {
  return [
    {
      id: 'dashboards',
      icon: 'iconsminds-shop-4',
      label: 'menu.dashboards',
      to: `${adminRoot}/dashboards`,
    },
    {
      id: 'corporate',
      icon: 'iconsminds-data-center',
      label: 'menu.b2b',
      to: `${adminRoot}/corporate`,
      subs: [
        {
          icon: 'iconsminds-building',
          label: 'menu.corporate',
          to: `${adminRoot}/corporate`,
        },
        {
          icon: 'iconsminds-library',
          label: 'menu.plans',
          to: `${adminRoot}/plans`,
        },
      ],
    },

    {
      id: 'menu',
      icon: 'simple-icon-user',
      label: 'menu.admin',
      to: `${adminRoot}/admin`,
    },
    {
      id: 'directory',
      icon: 'iconsminds-user',
      label: 'menu.directory',
      to: `${adminRoot}/directory/userlist`,
    },
    {
      id: 'category',
      icon: 'simple-icon-layers',
      label: 'menu.category',
      to: `${adminRoot}/categories`,
    },
    {
      id: 'advisor',
      icon: 'iconsminds-student-male',
      label: 'menu.advisor',
      to: `${adminRoot}/advisor`,
      subs: [
        {
          icon: 'iconsminds-business-man',
          label: 'menu.lawyer',
          to: `${adminRoot}/advisor/lawyer`,
        },
        {
          icon: 'iconsminds-stethoscope',
          label: 'menu.sexologist',
          to: `${adminRoot}/advisor/sexologist`,
        },
        {
          icon: 'iconsminds-brain',
          label: 'menu.psychologist',
          to: `${adminRoot}/advisor/psychologist`,
        },
      ],
    },

    {
      id: 'coupons',
      icon: 'simple-icon-badge',
      label: 'menu.coupons',
      to: `${adminRoot}/coupons`,
    },
    {
      id: 'account',
      icon: 'iconsminds-money-bag',
      label: 'menu.account',
      to: `${adminRoot}/account/advisor-transaction`,
    },
    {
      id: 'menu2',
      icon: 'iconsminds-notepad',
      label: 'menu.menu',
      to: `${adminRoot}/request`,
    },
    {
      id: 'kyc',
      icon: 'iconsminds-qr-code',
      label: 'menu.kyc',
      to: `${adminRoot}/kyc`,
      subs: [
        {
          icon: 'iconsminds-business-man',
          label: 'menu.lawyer',
          to: `${adminRoot}/kyc/lawyer`,
        },
        {
          icon: 'iconsminds-stethoscope',
          label: 'menu.sexologist',
          to: `${adminRoot}/kyc/sexologist`,
        },
        {
          icon: 'iconsminds-brain',
          label: 'menu.psychologist',
          to: `${adminRoot}/kyc/psychologist`,
        },
      ],
    },
    {
      id: 'docs',
      icon: 'iconsminds-library',
      label: 'menu.customize-field',
      to: `${adminRoot}/customize-field`,
      subs: [
        {
          icon: 'simple-icon-notebook',
          label: 'menu.call-amount',
          to: `${adminRoot}/customize-field/call-amount`,
          subs: [
            {
              icon: 'iconsminds-business-man',
              label: 'menu.lawyer',
              to: `${adminRoot}/customize-field/call-amount/lawyer`,
            },
            {
              icon: 'iconsminds-stethoscope',
              label: 'menu.sexologist',
              to: `${adminRoot}/customize-field/call-amount/sexologist`,
            },
            {
              icon: 'iconsminds-brain',
              label: 'menu.psychologist',
              to: `${adminRoot}/customize-field/call-amount/psychologist`,
            },
          ],
        },
        {
          icon: 'simple-icon-notebook',
          label: 'menu.expertise',
          to: `${adminRoot}/customize-field/expertise`,
          subs: [
            {
              icon: 'iconsminds-business-man',
              label: 'menu.lawyer',
              to: `${adminRoot}/customize-field/expertise/lawyer`,
            },
            {
              icon: 'iconsminds-stethoscope',
              label: 'menu.sexologist',
              to: `${adminRoot}/customize-field/expertise/sexologist`,
            },
            {
              icon: 'iconsminds-brain',
              label: 'menu.psychologist',
              to: `${adminRoot}/customize-field/expertise/psychologist`,
            },
          ],
        },
        {
          icon: 'simple-icon-notebook',
          label: 'menu.call-sessions',
          to: `${adminRoot}/customize-field/call_session`,
          subs: [
            {
              icon: 'iconsminds-business-man',
              label: 'menu.lawyer',
              to: `${adminRoot}/customize-field/call_session/lawyer`,
            },
            {
              icon: 'iconsminds-stethoscope',
              label: 'menu.sexologist',
              to: `${adminRoot}/customize-field/call_session/sexologist`,
            },
            {
              icon: 'iconsminds-brain',
              label: 'menu.psychologist',
              to: `${adminRoot}/customize-field/call_session/psychologist`,
            },
          ],
        },
        {
          icon: 'simple-icon-layers',
          label: 'menu.banner',
          to: `${adminRoot}/customize-field/banner`,
        },
      ],
    },
  ];
};
export default data;
