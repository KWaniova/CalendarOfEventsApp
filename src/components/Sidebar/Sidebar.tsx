import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space.normal};
  // margin-right: ${({ theme }) => theme.space.normal};
  border-right: 1px solid ${({ theme }) => theme.colors.grayQuaternary};
  width: 220px;
  background-color: ${({ theme }) => theme.colors.brandQuaternary};
`;

type NavigationItemProps = {
  active?: boolean;
};

const NavigationItemWrapper = styled.li<NavigationItemProps>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space.normal};
  border-radius: ${({ theme }) => theme.radii.normal};
  cursor: pointer;
  font-size: 16px;

  ${({ active, theme }) =>
    active
      ? `
    background-color: ${theme.colors.brandPrimary};
    color: ${theme.colors.white};
    font-weight: 600;
  `
      : `&:hover {
    background-color: ${theme.colors.brandQuaternary};
    color: ${theme.colors.black};
    font-weight: 600;
    transition: none;
  }`}
`;

const navigationSchema = [
  {
    title: "My profile",
    id: "my-profile",
    path: "/app/profile",
  },
  {
    title: "My connections",
    id: "my-connections",
    path: "/app/connections",
  },
  {
    title: "Connection requests",
    id: "connection-requests",
    path: "/app/connection_requests",
  },
  {
    title: "Users list",
    id: "users-list",
    path: "/app/users_list",
  },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const activeItem = pathname;
  return (
    <Wrapper>
      <ul>
        {navigationSchema.map((item) => (
          <NavigationItem
            onClick={() => {
              navigate(item.path);
            }}
            active={item.path === activeItem}
            title={item.title}
          />
        ))}
      </ul>
    </Wrapper>
  );
}

function NavigationItem({
  title,
  active,
  onClick,
}: {
  title: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <NavigationItemWrapper onClick={onClick} active={active}>
      {title}
    </NavigationItemWrapper>
  );
}
