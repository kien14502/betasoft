'use client';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useSearchUserInfinite } from '@/services/auth-service';
import Image from 'next/image';
import { USER_AVATAR_URL } from '@/constants/common';
import { Loader, Search, SearchX } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import InputForm from '@/components/common/form/InputField';
import { emailSchema, EmailSchema } from '@/constants/schemas/common-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { User } from '@/interface/auth';
import UserChatView from './UserChatView';

const SearchUserForm = () => {
  const [userSelected, setUserSelected] = useState<User | null>(null);

  const form = useForm<EmailSchema>({
    defaultValues: { email: '' },
    resolver: zodResolver(emailSchema),
  });

  const [search, setSearch] = useState('');

  const {
    data: users,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useSearchUserInfinite(search);

  const { targetRef } = useInfiniteScroll({
    hasMore: hasNextPage,
    loading: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  const onSubmit = (values: EmailSchema) => {
    setSearch(values.email);
  };

  if (userSelected) {
    return <UserChatView user={userSelected} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <InputForm
            name="email"
            prefix={isFetching ? <Loader /> : <Search />}
            control={form.control}
          />
        </form>
      </Form>
      <div className="flex flex-col gap-2">
        {users && users.length === 0 && (
          <div className="text-sm flex items-center gap-2 font-medium text-red-500">
            <SearchX />
            User not found
          </div>
        )}
        {users?.map((user) => (
          <div
            onClick={() => setUserSelected(user)}
            className="py-2 flex items-center gap-2 px-3 hover:bg-gray-1"
            key={user.id}
          >
            <Image
              width={32}
              height={32}
              className="rounded-full object-center"
              src={user.profile_image || USER_AVATAR_URL}
              alt=""
            />
            <span className="text-sm font-medium">{user.full_name}</span>
          </div>
        ))}
        <div ref={targetRef} />
      </div>
    </div>
  );
};

export default SearchUserForm;
