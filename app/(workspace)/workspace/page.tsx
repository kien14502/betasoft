'use client';
import {
  getAuthOrganizations,
  useGetAuthOrganizationsInfinite,
} from '@/app/api/organizations/organizations';
import { EModePage, ERole } from '@/app/constants';
import { actions, useStore } from '@/app/store';
import { TeamOutlined } from '@ant-design/icons';
import { Avatar, Button, List, Skeleton } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

const WorkSpaceList = () => {
  const router = useRouter();
  const [_, dispatch] = useStore();

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAuthOrganizationsInfinite(
      {
        page: 1,
        page_size: 2,
      },
      {
        query: {
          refetchOnMount: 'always',
          staleTime: 1000 * 60 * 10,
          queryFn: ({ pageParam = 1 }) =>
            getAuthOrganizations({ page_size: 2, page: pageParam as number }),
          getNextPageParam: (lastPage, allPages) => {
            const total = lastPage.data?.total ?? 0;
            const loaded = allPages.length * 2;
            return loaded < total ? allPages.length + 1 : undefined;
          },
        },
      },
    );

  const organizations = data?.pages.flatMap((page) => page.data?.organizations || []) || [];

  const avatarGroup = (url: string | undefined) =>
    url ? <Avatar src={url} /> : <TeamOutlined size={32} />;

  return (
    <div style={{ backgroundColor: 'white', width: '100%' }}>
      <div style={{ fontSize: '3rem' }}>Welcome back!</div>
      <List
        className="demo-loadmore-list"
        loading={isLoading || isFetching}
        itemLayout="horizontal"
        dataSource={organizations}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={isFetching} active>
              <List.Item.Meta
                avatar={avatarGroup(item.organization?.avatar)}
                title={<a>{item.organization?.name}</a>}
                description={
                  <div>
                    <div>
                      <h5>
                        {item.organization?.industry} {`(${item.organization?.member_count}member)`}
                      </h5>
                    </div>
                    <div>{item.organization?.description}</div>
                  </div>
                }
              />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {item.role == ERole.ADMIN && (
                  <>
                    <Button
                      type={'primary'}
                      onClick={() => {
                        router.push(`/workspace/${item.organization?.id}?mode=${EModePage.EDIT}`);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      type={'primary'}
                      onClick={() => {
                        dispatch(actions.setWorkspaceActive(item.organization));
                        router.push(`/workspace/${item.organization?.id}`);
                      }}
                    >
                      View
                    </Button>
                  </>
                )}
                <Button type={'primary'}>Launch</Button>
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
      {hasNextPage && (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 40,
            lineHeight: '40px',
          }}
        >
          <Button onClick={() => fetchNextPage()} loading={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default WorkSpaceList;
