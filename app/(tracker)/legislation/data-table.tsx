'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  GlobalFilterTableState,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { memo, useEffect, useState } from 'react';

import { Spinner } from '@/components/icons';
import { InfoPopoverButton } from '@/components/ui/InfoPopoverButton';
import { Label } from '@/components/ui/Label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Selector';
import { Skeleton } from '@/components/ui/Skeleton';
import { rankItem } from '@tanstack/match-sorter-utils';
import { useLegislationFilters } from 'app/hooks/useFilters';
import { updateLegislationFilters } from 'app/store/filters-store';
import { Biennium } from 'app/types/legislation';
import { fuzzySort } from './columns';

const BienniumSelector = memo(
  ({
    disabled,
    onChange
  }: {
    disabled?: boolean;
    onChange?: (biennium: Biennium) => void;
  }) => {
    const filters = useLegislationFilters();

    return (
      <Select
        disabled={disabled}
        value={filters.biennium}
        onValueChange={(biennium: Biennium) => {
          updateLegislationFilters({ biennium });
          onChange?.(biennium);
        }}
      >
        <div className="mr-2">
          <Label
            htmlFor="bienniumSelect"
            className="cursor-pointer flex items-center pl-1 mb-1 text-muted-foreground"
          >
            Biennium
            <InfoPopoverButton
              title={'Biennium'}
              description={
                "Two year time period beginning on odd years. Legislation introduced during this time period can be considered in any sessions scheduled within the time period. Information is only available from 1991-current. e.g. '2023-24'"
              }
              align="center"
              side="top"
            />
          </Label>
          <SelectTrigger className="max-w-52" id="bienniumSelect">
            <SelectValue placeholder="Select Biennium" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Biennium</SelectLabel>
              {Object.keys(Biennium).map((val) => (
                <SelectItem key={val} value={val}>
                  {val}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </div>
      </Select>
    );
  }
);

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({ itemRank });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  filters?: React.ReactNode[];
}

export function DataTable<TData, TValue>({
  filters,
  columns,
  data,
  isLoading
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<GlobalFilterTableState>();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: fuzzyFilter,
    sortingFns: {
      fuzzy: fuzzySort
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination
    }
  });

  useEffect(() => {
    table.getColumn('billId')?.toggleSorting(false, true);
  }, []);
  // i still love u <3

  const firstRowIndex =
    table.getRowCount() === 0
      ? 0
      : 1 +
        table.getState().pagination.pageIndex *
          table.getState().pagination.pageSize;

  const lastRowIndex = Math.min(
    table.getState().pagination.pageIndex *
      table.getState().pagination.pageSize +
      table.getState().pagination.pageSize,
    table.getRowCount()
  );

  return (
    <div>
      <div className="flex items-end py-4">
        <BienniumSelector disabled={isLoading} />
        <Input
          disabled={isLoading}
          type="text"
          placeholder="Search..."
          value={table.getState().globalFilter ?? ''}
          onChange={(event) => {
            // find way to disable bill id sort on search
            table.setGlobalFilter(event.target.value);
            table.getColumn('shortDescription')?.toggleSorting(false, true);
          }}
          className="max-w-48 mr-2"
        />
        {isLoading && (
          <div className="flex items-center w-min">
            <Spinner />
          </div>
        )}
        {filters}
      </div>
      {isLoading ? (
        <>
          <div className="my-2 flex">
            <Skeleton className="w-1/3 h-[50] mr-2" />
            <Skeleton className="w-1/3 h-[50]" />
          </div>
          <Skeleton className="w-full h-[200]" />
          <div className="my-2 flex justify-end">
            <Skeleton className="max-w-48 h-[40] mr-2" />
            <Skeleton className="max-w-48 h-[40]" />
          </div>
        </>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-xs text-muted-foreground">
              Showing{' '}
              <strong>
                {firstRowIndex}-{lastRowIndex}
              </strong>{' '}
              of <strong>{table.getRowCount()}</strong> bills
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
