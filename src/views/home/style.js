import styled from 'styled-components'

const backColor = `#d1e3fa`

export const HomeWrap = styled.div`
  width: 100%;
  height: 100vh;

  .layout-wrap {
    width: 100%;
    height: 100vh;

    .layout-sider {
      box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);

      .menuLogo {
        height: 64px;
        background-color: #001529;
        display: flex;
        justify-content: center;
        align-items: center;
				.text{
					color: #fff;
					font-size: 20px;
				}
      }

      &.hide {
        a {
          display: flex;
          justify-content: center;

          div {
            overflow: hidden;
            opacity: 0;
            width: 0;
          }
        }
      }

      a {
        display: flex;
        height: 100%;
        align-items: center;

        img {
          width: 40px;
          flex: none;
          margin-left: 12px;
        }

        div {
          color: #fff;
          width: 100%;
          font-size: 24px;
          padding-left: 10px;
          white-space: nowrap;
          transition: all 0.3s;
        }
      }
    }

    .layout-header {
      background-color: #fff;
      padding: 0;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      overflow: hidden;
      display: flex;
      align-items: center;

      .trigger {
        padding: 0 24px;
        font-size: 20px;
        cursor: pointer;
        line-height: 64px;
        transition: all 0.3s;
        transform: rotate(180deg);

        &.fold {
          transform: rotate(0);
        }

        &:hover {
          background-color: ${backColor};
        }
      }

      .rightBox {
        flex: auto;
        display: flex;
        justify-content: flex-end;

        .full {
          padding: 24px 24px;
          cursor: pointer;
          transition: add 0.3s;
          display: flex;
          align-items: center;
          //.ant-badge{
          //  display: inline!important;
          //  .ant-bodge-count{
          //    top: -15px;
          //  }
          //}
          .icon {
            font-size: 20px;
          }

          &:hover {
            background-color: ${backColor};
          }

          a {
            display: block;
            width: 100%;
            height: 100%;
          }
        }

        .userhead {
          padding: 0 20px;
          margin-right: 4px;
          cursor: pointer;
          font-size: 20px;
          display: flex;
          align-items: center;

          .username {
            font-size: 14px;
            margin-left: 4px;
          }

          &:hover {
            background-color: ${backColor};
          }
        }
      }
    }

    .layout-content {
      margin: 5px;
      background-color: #fff;
    }
  }
`

export const HomePageWrap = styled.div`
  position: relative;
`;

export const LayoutHeaderStyle = styled.div`

`
