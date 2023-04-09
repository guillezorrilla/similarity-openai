'use client';

import { FC, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/ui/DropdownMenu';
import { Button } from './ui/Button';
import { Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/Toast';
import { useRouter } from 'next/navigation';
import { revokeApiKey } from '@/helpers/revoke-api-key';
import { createApiKey } from '@/helpers/create-api-key';

interface IApiKeyOptionsProps {
  apiKeyKey: string;
  apiKeyId: string;
}
const ApiKeyOptions: FC<IApiKeyOptionsProps> = ({ apiKeyId, apiKeyKey }) => {
  const router = useRouter();
  const [isCretingNew, setIsCreatingNew] = useState<boolean>(false);
  const [isRevoking, setIsRevoking] = useState<boolean>(false);
  const createNewApiKey = async () => {
    setIsCreatingNew(true);
    try {
      await revokeApiKey({
        keyId: apiKeyId
      });
      await createApiKey();
      router && router.refresh();
    } catch (error) {
      toast({
        title: 'Error creating API key',
        message:
          'An error occurred while creating a new API key. Please try again later.',
        type: 'error'
      });
    } finally {
      setIsCreatingNew(false);
    }
  };

  const revokeCurrentApiKey = async () => {
    setIsRevoking(true);
    try {
      await revokeApiKey({
        keyId: apiKeyId
      });
      router && router.refresh();
    } catch (error) {
      toast({
        title: 'Error revoking API key',
        message:
          'An error occurred while revoking the API key. Please try again later.',
        type: 'error'
      });
    } finally {
      setIsRevoking(false);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isCretingNew || isRevoking} asChild>
        <Button variant="ghost" className="flex gap-2 items-center">
          <p>
            {isCretingNew
              ? 'Creating new key'
              : isRevoking
              ? 'Revoking key'
              : 'Options'}
          </p>
          {isCretingNew || isRevoking ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(apiKeyKey);
            toast({
              title: 'Copied!',
              message: 'The API key has been copied to your clipboard.',
              type: 'success'
            });
          }}>
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={createNewApiKey}>
          Create new key
        </DropdownMenuItem>
        <DropdownMenuItem onClick={revokeCurrentApiKey}>
          Revoke key
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApiKeyOptions;
