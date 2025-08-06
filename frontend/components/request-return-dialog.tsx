"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import axios from "@/utils/axios";

export function RequestReturnDialog({ orderId }: { orderId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [items, setItems] = useState([
    { name: "", reason: "", condition: "unopened", refundAmount: 0 },
  ]);
  const [totalRefund, setTotalRefund] = useState(0);
  const [returnMethod, setReturnMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const handleItemChange = (index: number, field: string, value: any) => {
    const updated = [...items];
    updated[index][field] = field === "refundAmount" ? parseFloat(value) : value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { name: "", reason: "", condition: "unopened", refundAmount: 0 }]);
  };

  const removeItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        reason,
        items,
        totalRefund,
        returnMethod,
      };
      await axios.post(`/orders/${orderId}/return`, payload);
      toast({ title: "Return Requested", description: "Your return has been submitted." });
      setIsOpen(false);
      formRef.current?.reset();
      setReason("");
      setItems([{ name: "", reason: "", condition: "unopened", refundAmount: 0 }]);
      setTotalRefund(0);
      setReturnMethod("");
    } catch (err) {
      console.error("Return failed", err);
      toast({ title: "Return Failed", description: "Something went wrong", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Request Return</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request a Return</DialogTitle>
          <DialogDescription>Provide the required details to initiate a return.</DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Overall Return Reason</Label>
            <Textarea
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why are you returning this order?"
            />
          </div>

          {items.map((item, index) => (
            <div key={index} className="border rounded p-4 space-y-2">
              <Label>Item #{index + 1}</Label>
              <Input
                value={item.name}
                onChange={(e) => handleItemChange(index, "name", e.target.value)}
                placeholder="Product Name"
                required
              />
              <Textarea
                value={item.reason}
                onChange={(e) => handleItemChange(index, "reason", e.target.value)}
                placeholder="Reason for returning this item"
                required
              />
              <Label>Condition</Label>
              <Select
                value={item.condition}
                onValueChange={(val) => handleItemChange(index, "condition", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unopened">Unopened</SelectItem>
                  <SelectItem value="partially_used">Partially Used</SelectItem>
                  <SelectItem value="damaged">Damaged</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={item.refundAmount}
                onChange={(e) => handleItemChange(index, "refundAmount", e.target.value)}
                placeholder="Refund Amount (₹)"
                required
              />
              {items.length > 1 && (
                <Button type="button" variant="destructive" onClick={() => removeItem(index)}>
                  Remove Item
                </Button>
              )}
            </div>
          ))}

          <Button type="button" variant="secondary" onClick={addItem}>
            Add Another Item
          </Button>

          <div>
            <Label>Total Refund Amount (₹)</Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={totalRefund}
              onChange={(e) => setTotalRefund(parseFloat(e.target.value))}
              placeholder="Total Refund"
              required
            />
          </div>

          <div>
            <Label>Return Method</Label>
            <Input
              value={returnMethod}
              onChange={(e) => setReturnMethod(e.target.value)}
              placeholder="e.g. pickup, courier, drop-off"
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Return Request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}